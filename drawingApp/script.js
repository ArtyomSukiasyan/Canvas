let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

let context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeRect(0, 0, canvas.width, canvas.height);

let prevX = null;
let prevY = null;

let isDraw = false;

window.addEventListener("mousedown", () => {
  isDraw = true;
});
window.addEventListener("mouseup", () => {
  isDraw = false;
});

window.addEventListener("mousemove", (e) => {
  if (!prevX || !prevY || !isDraw) {
    prevX = e.clientX;
    prevY = e.clientY;

    return;
  }

  let mouseX = e.clientX;
  let mouseY = e.clientY;

  context.beginPath();
  context.moveTo(prevX, prevY);
  context.lineTo(mouseX, mouseY);
  context.stroke();

  prevX = e.clientX;
  prevY = e.clientY;
});
