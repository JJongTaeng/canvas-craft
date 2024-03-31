import { Toolbar } from './Toolbar';
import { DrawType } from './DrawType.ts';
import { Shape } from './Shape.ts';

export class CanvasCraft {
  toolbar = new Toolbar();
  ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d')!;
  }

  draw(drawType: DrawType, path: Path2D) {
    switch (drawType.shape) {
      case Shape.CIRCLE:
        this.drawCircle(drawType, path);
        break;
      case Shape.FREE:
        this.drawPath(drawType, path);
        break;
      case Shape.SQUARE:
        this.drawSquare(drawType, path);
        break;
      case Shape.TRIANGLE:
        this.drawTriangle(drawType, path);
        break;
      default:
        throw new Error('Invaliad Draw Type');
    }
  }

  private drawCircle(drawType: DrawType, path: Path2D) {}

  private drawPath(drawType: DrawType, path: Path2D) {}

  private drawSquare(drawType: DrawType, path: Path2D) {}

  private drawTriangle(drawType: DrawType, path: Path2D) {}
}
