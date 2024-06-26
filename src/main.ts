import { CanvasCraft } from '../lib/main';
import './style.css';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const copyCanvas = document.querySelector('.copy-canvas') as HTMLCanvasElement;
const removeButton = document.querySelector('.remove') as HTMLButtonElement;
const undoButton = document.querySelector('.undo') as HTMLButtonElement;
const redoButton = document.querySelector('.redo') as HTMLButtonElement;
const copyButton = document.querySelector('.copy') as HTMLButtonElement;
const fadeCheckbox = document.querySelector('#fade') as HTMLButtonElement;

const shapeSelect = document.querySelector(
  '#shape-select',
) as HTMLSelectElement;
const colorSelect = document.querySelector('#color') as HTMLInputElement;
const lineWidthSlide = document.querySelector(
  '#line-width',
) as HTMLInputElement;
const lineWidthValue = document.querySelector('.line-width-value');

const canvasCraft = new CanvasCraft({ canvas, option: { fade: false } });
const copyCanvasCraft = new CanvasCraft({
  canvas: copyCanvas,
  option: { fade: true },
});

canvasCraft.on('drawstart', (param) => {
  console.log(`drawstart = `, param);
});
canvasCraft.on('drawing', (param) => {
  console.log(`drawing = `, param);
});
canvasCraft.on('drawend', (param) => {
  console.log(`drawend = `, param);
});
canvasCraft.on('fadeend', (param) => {
  console.log(`fadeend = `, param);
});

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

fadeCheckbox.addEventListener('change', (e) => {
  const target = e.target! as any;
  canvasCraft.option.fade = target.checked;
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
    strokeStyle: target.value,
  });
});

lineWidthSlide.addEventListener('change', (e) => {
  const target = e.target! as any;
  lineWidthValue!.innerHTML = target.value;
  canvasCraft.changeDrawType({
    lineWidth: target.value,
  });
});
