const canvas = document.getElementById("canvas");
canvas.width = 288;
canvas.height = 512;
const context = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

const GRAVITATION = 1.5;
const GAP = 200;

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 25;
}

const pipe = [
  {
    x: canvas.width,
    y: 0,
  },
];

let score = 0;

let xPos = 10;
let yPos = 150;

function draw() {
  context.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + GAP);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    const bottom = pipe[i].y + pipeUp.height + GAP;
    const isMeetBottomPipeInside = yPos + bird.height >= bottom;

    const isMeetUpPipeInside = yPos <= pipe[i].y + pipeUp.height;

    const isMeetBottomPipeOutside = xPos <= pipe[i].x + pipeUp.width;
    const isMeetUpPipeOutside = xPos + bird.width >= pipe[i].x;

    const isMeetInside = isMeetUpPipeInside || isMeetBottomPipeInside;
    const isMeetOutside = isMeetUpPipeOutside && isMeetBottomPipeOutside;

    const isMeetPipe = isMeetOutside && isMeetInside;
    const isOnFloor = yPos + bird.height >= canvas.height - fg.height;

    if (isMeetPipe || isOnFloor) {
      location.reload();
    }

    if (pipe[i].x === 0) {
      score++;
    }
  }

  context.drawImage(fg, 0, canvas.height - fg.height);
  context.drawImage(bird, xPos, yPos);

  yPos += GRAVITATION;

  context.fillStyle = "#000";
  context.font = "24px";
  context.fillText("Count: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
