import { DrawType } from './DrawType';
import { Shape } from './Shape';

export class Toolbar {
  drawType = new DrawType();
  paths: Path2D[] = [];
  currentIndex: number = 0;

  changeColor(color: string) {
    this.drawType.color = color;
  }

  changeShape(shape: Shape) {
    this.drawType.shape = shape;
  }

  changeStrokeWidth(strokeWidth: number) {
    this.drawType.strokeWidth = strokeWidth;
  }

  redo() {
    if (this.currentIndex <= 0) {
      return;
    }

    this.currentIndex -= 1;
  }

  undo() {
    if (this.currentIndex === this.paths.length) {
      return;
    }
    this.currentIndex += 1;
  }
}
