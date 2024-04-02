import { DrawType } from './DrawType.ts';

export interface PathInfo {
  drawType: DrawType;
  path: Path2D;
}

export interface Command {
  name: string;
  params: {};
}

export interface AdvancedPath2DData {
  commandList: Command[];
  drawType: DrawType;
}
