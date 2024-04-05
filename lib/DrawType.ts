import { Shape } from './Shape';

export class DrawType {
  shape: Shape = Shape.FREE;
  strokeStyle: string = '#000000';
  lineWidth: number = 1;
  globalAlpha: number = 1;
}
