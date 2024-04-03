import { CanvasCraft } from '../lib/main';
import './style.css';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const copyCanvas = document.querySelector('.copy-canvas') as HTMLCanvasElement;
const removeButton = document.querySelector('.remove') as HTMLButtonElement;
const undoButton = document.querySelector('.undo') as HTMLButtonElement;
const redoButton = document.querySelector('.redo') as HTMLButtonElement;
const copyButton = document.querySelector('.copy') as HTMLButtonElement;

const shapeSelect = document.querySelector(
  '#shape-select',
) as HTMLSelectElement;
const colorSelect = document.querySelector('#color') as HTMLInputElement;
const lineWidthSlide = document.querySelector(
  '#line-width',
) as HTMLInputElement;
const lineWidthValue = document.querySelector('.line-width-value');

const canvasCraft = new CanvasCraft(canvas);
const copyCanvasCraft = new CanvasCraft(copyCanvas);

removeButton.addEventListener('click', () => {
  canvasCraft.removeAll();
});

undoButton.addEventListener('click', () => {
  canvasCraft.undo();
});

redoButton.addEventListener('click', () => {
  canvasCraft.redo();
});

copyButton.addEventListener('click', () => {
  const infoList = canvasCraft.toArray();
  copyCanvasCraft.arrayToPath(infoList);
});

shapeSelect.addEventListener('change', (e) => {
  const target = e.target! as any;
  canvasCraft.changeDrawType({
    shape: target.value,
  });
});

colorSelect.addEventListener('change', (e) => {
  const target = e.target! as any;
  canvasCraft.changeDrawType({
    color: target.value,
  });
});

lineWidthSlide.addEventListener('change', (e) => {
  const target = e.target! as any;
  lineWidthValue!.innerHTML = target.value;
  canvasCraft.changeDrawType({
    lineWidth: target.value,
  });
});
