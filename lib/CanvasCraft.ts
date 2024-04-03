import { DrawType } from './DrawType.ts';
import { Shape } from './Shape.ts';
import { PathManager } from './PathManager.ts';
import { AdvancedPath2DData } from './type.ts';
import { AdvancedPath2D } from './AdvancedPath2D.ts';

export class CanvasCraft {
  private ctx: CanvasRenderingContext2D;
  private drawType: DrawType = new DrawType();
  private pathManager = new PathManager();
  private isMousedown = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private init() {
    this.canvas.style.cursor = 'crosshair';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.canvas.addEventListener('mouseout', this.mouseout.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseup.bind(this));
    this.canvas.addEventListener('mousedown', this.mousedown.bind(this));
    this.canvas.addEventListener('mousemove', this.mousemove.bind(this));
  }

  draw(x: number, y: number) {
    switch (this.drawType.shape) {
      case Shape.CIRCLE:
        this.drawCircle();
        break;
      case Shape.FREE:
        this.drawPath(x, y);
        break;
      case Shape.SQUARE:
        this.drawSquare();
        break;
      case Shape.TRIANGLE:
        this.drawTriangle();
        break;
      case Shape.ERASER:
        this.erase(x, y);
        break;
      default:
        throw new Error('Invaliad Draw Type');
    }
  }

  changeDrawType(drawType: Partial<DrawType>) {
    console.debug('[change] drawType: ', drawType);
    this.drawType = {
      ...this.drawType,
      ...drawType,
    };
    this.applyDrawType();
  }

  undo() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pathManager.undo();
    this.redraw();
  }

  redo() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pathManager.redo();
    this.redraw();
  }

  removeAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pathManager.clear();
    this.redraw();
  }

  toArray(): AdvancedPath2DData[] {
    return this.pathManager.toArray();
  }

  arrayToPath(advancedPath2DDataList: AdvancedPath2DData[]) {
    this.pathManager.pathInfoList = advancedPath2DDataList.map(
      (advancedPath2DData) => {
        const path2D = new AdvancedPath2D();
        path2D.make(advancedPath2DData.commandList);
        return {
          path: path2D,
          drawType: advancedPath2DData.drawType,
        };
      },
    );
    this.redraw();
  }

  private applyDrawType() {
    this.ctx.lineWidth = this.drawType.lineWidth;
    this.ctx.strokeStyle = this.drawType.color;
    if (this.drawType.shape === Shape.ERASER) {
      this.ctx.globalCompositeOperation = 'destination-out';
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
    }
  }

  private erase(x: number, y: number) {
    let pathInfo = this.pathManager.current();
    pathInfo.path.lineTo(x, y);
    this.ctx.stroke(pathInfo.path);
  }

  private drawCircle() {}

  private drawPath(x: number, y: number) {
    let pathInfo = this.pathManager.current();
    pathInfo.path.lineTo(x, y);
    this.ctx.stroke(pathInfo.path);
  }

  private drawSquare() {}

  private drawTriangle() {}

  private mousedown() {
    this.pathManager.create(this.drawType);
    this.isMousedown = true;
  }
  private mouseup() {
    const pathInfo = this.pathManager.current();
    pathInfo.drawType = this.drawType;
    this.isMousedown = false;
    console.debug('[draw] pathInfo:', pathInfo);
  }
  private mouseout() {
    const pathInfo = this.pathManager.current();
    pathInfo.drawType = this.drawType;
    if (this.isMousedown) {
      console.debug('[draw] pathInfo:', pathInfo);
    }
    this.isMousedown = false;
  }
  private mousemove(e: MouseEvent) {
    if (this.isMousedown) {
      this.draw(e.offsetX, e.offsetY);
    }
  }

  private redraw() {
    const pathInfoList = this.pathManager.merge();
    console.debug('[redraw] pathInfoList: ', pathInfoList);
    pathInfoList.forEach((pathInfo) => {
      this.changeDrawType(pathInfo.drawType);
      this.ctx.stroke(pathInfo.path);
    });
  }
}
