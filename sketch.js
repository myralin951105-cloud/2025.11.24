let sprite2, sprite3;
const COLS2 = 10; // all_2.png 有 10 幀
const COLS3 = 8;  // all_3.png 有 8 幀
let frames2 = [];
let frames3 = [];
let frameH2 = 0;
let frameH3 = 0;
const ANIM_FPS2 = 12; // all_2 播放速度（可調）
const ANIM_FPS3 = 12; // all_3 播放速度（可調）

function preload() {
  // 載入 all_2 與 all_3（left 改回使用 all_2）
  sprite2 = loadImage('2/all_2.png');
  sprite3 = loadImage('3/all_3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);

  // 切出 all_2.png 的幀（10 幀）
  frameH2 = sprite2.height;
  const swFloor2 = floor(sprite2.width / COLS2);
  for (let i = 0; i < COLS2; i++) {
    const sx = i * swFloor2;
    const sw = (i === COLS2 - 1) ? sprite2.width - sx : swFloor2;
    frames2[i] = sprite2.get(sx, 0, sw, frameH2);
  }

  // 切出 all_3.png 的幀（8 幀）
  frameH3 = sprite3.height;
  const swFloor3 = floor(sprite3.width / COLS3);
  for (let i = 0; i < COLS3; i++) {
    const sx = i * swFloor3;
    const sw = (i === COLS3 - 1) ? sprite3.width - sx : swFloor3;
    frames3[i] = sprite3.get(sx, 0, sw, frameH3);
  }
}

function draw() {
  background('#dee2e6');
  // 左右並排顯示 all_2 (左) 與 all_3 (右)，垂直置中
  const idx2 = floor((millis() / 1000) * ANIM_FPS2) % COLS2;
  const img2 = frames2[idx2];
  const idx3 = floor((millis() / 1000) * ANIM_FPS3) % COLS3;
  const img3 = frames3[idx3];

  // 可用寬度給每一側（預留間距）
  const sideMaxWidth = width * 0.45; // 每側最多佔畫面寬度的 45%
  const sideMaxHeight = height * 0.8; // 每側最大高度為畫面高度的 80%

  // 左圖（all_2）縮放：同時受高度與寬度限制
  const scaleH2 = sideMaxHeight / frameH2;
  const scaleW2 = sideMaxWidth / img2.width;
  const scale2 = min(scaleH2, scaleW2);
  const drawW2 = img2.width * scale2;
  const drawH2 = img2.height * scale2;

  // 右圖（all_3）縮放：同時受高度與寬度限制
  const scaleH3 = sideMaxHeight / frameH3;
  const scaleW3 = sideMaxWidth / img3.width;
  const scale3 = min(scaleH3, scaleW3);
  const drawW3 = img3.width * scale3;
  const drawH3 = img3.height * scale3;

  // 左右 X 座標（置中但分佈左/右）
  const leftX = width * 0.25;
  const rightX = width * 0.75;
  const centerY = height / 2;

  image(img2, leftX, centerY, drawW2, drawH2);
  image(img3, rightX, centerY, drawW3, drawH3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}