import { AdvancedPath2D } from './AdvancedPath2D.ts';

export class PathManager {
  private undoPathList: Path2D[] = [];
  private pathList: Path2D[] = [];

  merge() {
    const current = new Path2D();
    for (const path of this.pathList) {
      current.addPath(path);
    }
    return current;
  }

  current() {
    return this.pathList[this.pathList.length - 1];
  }

  create() {
    const path = new AdvancedPath2D();
    this.pathList.push(path);
    return path;
  }

  add(path: AdvancedPath2D) {
    this.pathList.push(path);
  }

  undo() {
    if (!this.pathList.length) return;
    let path = this.pathList.pop()!;
    this.undoPathList.push(path);
  }

  redo() {
    if (!this.undoPathList.length) return;
    const path = this.undoPathList.pop()!;
    this.pathList.push(path);
  }

  clear() {
    this.pathList = [];
    this.undoPathList = [];
  }
}
