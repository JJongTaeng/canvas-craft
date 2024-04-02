import { AdvancedPath2D } from './AdvancedPath2D.ts';
import { DrawType } from './DrawType.ts';
import { AdvancedPath2DData, PathInfo } from './type.ts';

export class PathManager {
  undoPathList: PathInfo[] = [];
  pathInfoList: PathInfo[] = [];

  merge() {
    const mergedPathInfoList: PathInfo[] = [];
    this.pathInfoList.forEach((pathInfo, index) => {
      if (index === 0) {
        const path = new Path2D();
        path.addPath(pathInfo.path);
        mergedPathInfoList.push({ path, drawType: pathInfo.drawType });
      } else {
        const prevDrawType = this.pathInfoList[index - 1].drawType;
        if (
          prevDrawType.color === pathInfo.drawType.color &&
          prevDrawType.lineWidth === pathInfo.drawType.lineWidth
        ) {
          const prevPathInfo =
            mergedPathInfoList[mergedPathInfoList.length - 1];
          prevPathInfo.path.addPath(pathInfo.path);
        } else {
          const path = new Path2D();
          path.addPath(pathInfo.path);
          mergedPathInfoList.push({ path, drawType: pathInfo.drawType });
        }
      }
    });
    return mergedPathInfoList;
  }

  current() {
    return this.pathInfoList[this.pathInfoList.length - 1];
  }

  create(drawType: DrawType) {
    const path = new AdvancedPath2D();
    this.pathInfoList.push({
      path,
      drawType,
    });
    return path;
  }

  undo() {
    if (!this.pathInfoList.length) return;
    let path = this.pathInfoList.pop()!;
    this.undoPathList.push(path);
  }

  redo() {
    if (!this.undoPathList.length) return;
    const path = this.undoPathList.pop()!;
    this.pathInfoList.push(path);
  }

  clear() {
    this.pathInfoList = [];
    this.undoPathList = [];
  }

  toArray(): AdvancedPath2DData[] {
    return this.pathInfoList.map((pathInfo) => {
      const path = pathInfo.path as AdvancedPath2D;
      const commandList = path.commandList;
      return {
        commandList,
        drawType: pathInfo.drawType,
      };
    });
  }
}
