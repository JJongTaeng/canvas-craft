import { CanvasCraft, Shape } from '../lib/main';
import './style.css';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const copyCanvas = document.querySelector('.copy-canvas') as HTMLCanvasElement;
const removeButton = document.querySelector('.remove') as HTMLButtonElement;
const undoButton = document.querySelector('.undo') as HTMLButtonElement;
const redoButton = document.querySelector('.redo') as HTMLButtonElement;

const redButton = document.querySelector('.red') as HTMLButtonElement;
const blueButton = document.querySelector('.blue') as HTMLButtonElement;
const copyButton = document.querySelector('.copy') as HTMLButtonElement;
const eraseButton = document.querySelector('.erase') as HTMLButtonElement;
const freeButton = document.querySelector('.free') as HTMLButtonElement;

const canvasCraft = new CanvasCraft(canvas);
const copyCanvasCraft = new CanvasCraft(copyCanvas);
redButton.addEventListener('click', () => {
  canvasCraft.changeDrawType({
    color: 'red',
  });
});

blueButton.addEventListener('click', () => {
  canvasCraft.changeDrawType({
    color: 'blue',
  });
});

removeButton.addEventListener('click', () => {
  canvasCraft.removeAll();
});

undoButton.addEventListener('click', (e) => {
  canvasCraft.undo();
});

redoButton.addEventListener('click', (e) => {
  canvasCraft.redo();
});

copyButton.addEventListener('click', () => {
  const infoList = canvasCraft.toArray();
  copyCanvasCraft.arrayToPath(infoList);
});

eraseButton.addEventListener('click', () => {
  canvasCraft.changeDrawType({
    shape: Shape.ERASER,
  });
});
freeButton.addEventListener('click', () => {
  canvasCraft.changeDrawType({
    shape: Shape.FREE,
  });
});
