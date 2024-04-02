import { DrawType } from './DrawType.ts';

export class AdvancedPath2D extends Path2D {
  commandList: {
    name: string;
    params: {};
  }[] = [];
  drawType: DrawType = new DrawType();

  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean,
  ) {
    this.commandList.push({
      name: 'arc',
      params: {
        x,
        y,
        radius,
        startAngle,
        endAngle,
        counterclockwise,
      },
    });
    super.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  }
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
    this.commandList.push({
      name: 'arcTo',
      params: {
        x1,
        y1,
        x2,
        y2,
        radius,
      },
    });
    super.arcTo(x1, y1, x2, y2, radius);
  }
  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number,
  ) {
    this.commandList.push({
      name: 'bezierCurveTo',
      params: {
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        x,
        y,
      },
    });
    super.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  closePath() {
    this.commandList.push({
      name: 'closePath',
      params: {},
    });
    super.closePath();
  }
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean,
  ) {
    this.commandList.push({
      name: 'ellipse',
      params: {
        x,
        y,
        radiusX,
        radiusY,
        rotation,
        startAngle,
        endAngle,
        counterclockwise,
      },
    });
    super.ellipse(
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      counterclockwise,
    );
  }
  lineTo(x: number, y: number) {
    this.commandList.push({
      name: 'lineTo',
      params: {
        x,
        y,
      },
    });
    super.lineTo(x, y);
  }
  moveTo(x: number, y: number) {
    this.commandList.push({
      name: 'moveTo',
      params: {
        x,
        y,
      },
    });
    super.moveTo(x, y);
  }
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.commandList.push({
      name: 'quadraticCurveTo',
      params: {
        cpx,
        cpy,
        x,
        y,
      },
    });
    super.quadraticCurveTo(cpx, cpy, x, y);
  }
  rect(x: number, y: number, w: number, h: number) {
    this.commandList.push({
      name: 'rect',
      params: {
        x,
        y,
        w,
        h,
      },
    });
    super.rect(x, y, w, h);
  }
  roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radii?: number | DOMPointInit | (number | DOMPointInit)[],
  ) {
    this.commandList.push({
      name: 'roundRect',
      params: {
        x,
        y,
        w,
        h,
        radii,
      },
    });
    super.roundRect(x, y, w, h, radii);
  }

  clearCommandList() {
    this.commandList = [];
  }

  toJSON() {
    return JSON.stringify(this.commandList);
  }

  make(
    commandList: {
      name: string;
      params: {};
    }[],
  ) {
    for (const command of commandList) {
      // @ts-ignore
      this?.[command.name]?.(...Object.values(command.params));
    }

    return this;
  }
}
