import './style.css';
import { PathManager } from '../lib/PathManager.ts';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const drawButton = document.querySelector('.redraw') as HTMLButtonElement;
const removeButton = document.querySelector('.remove') as HTMLButtonElement;
const undoButton = document.querySelector('.undo') as HTMLButtonElement;
const redoButton = document.querySelector('.redo') as HTMLButtonElement;
const ctx = canvas.getContext('2d')!;

const pathManager = new PathManager();

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let down = false;

canvas.addEventListener('mousedown', (e) => {
  const path = pathManager.create();
  path.moveTo(e.offsetX, e.offsetY);
  down = true;
});

canvas.addEventListener('mouseup', (e) => {
  down = false;
});

canvas.addEventListener('mouseout', () => {
  down = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (down) {
    const path = pathManager.current();
    path.lineTo(e.offsetX, e.offsetY);
    ctx.stroke(path);
  }
});

drawButton.addEventListener('click', () => {
  const mergedPath = pathManager.merge();
  ctx.stroke(mergedPath);
});

removeButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

undoButton.addEventListener('click', (e) => {
  pathManager.undo();
  let path2D = pathManager.merge();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke(path2D);
});

redoButton.addEventListener('click', (e) => {
  pathManager.redo();
  let path2D = pathManager.merge();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke(path2D);
});
