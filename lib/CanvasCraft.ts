import { DrawType } from './DrawType.ts';
import { Shape } from './Shape.ts';
import { PathManager } from './PathManager.ts';

export class CanvasCraft {
  ctx: CanvasRenderingContext2D;
  drawType: DrawType = new DrawType();
  private pathManager = new PathManager();
  private isMousedown = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private init() {
    this.canvas.addEventListener('mouseout', this.mouseout.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseup.bind(this));
    this.canvas.addEventListener('mouseclick', this.mousedown.bind(this));
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
      default:
        throw new Error('Invaliad Draw Type');
    }
  }

  private drawCircle() {}

  private drawPath(x: number, y: number) {
    let path2D = this.pathManager.current();
    path2D.lineTo(x, y);
    this.ctx.stroke(path2D);
  }

  private drawSquare() {}

  private drawTriangle() {}

  private mousedown() {
    this.pathManager.create();
    this.isMousedown = true;
  }
  private mouseup() {
    this.isMousedown = false;
  }
  private mouseout() {
    this.isMousedown = false;
  }
  private mousemove(e: MouseEvent) {
    if (this.isMousedown) {
      this.draw(e.offsetX, e.offsetY);
    }
  }
}
