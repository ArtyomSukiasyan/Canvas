const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

let context = canvas.getContext("2d");
context.lineWidth = 5;

let colors = document.querySelectorAll(".color");
colors = Array.from(colors);
colors.forEach((color) => {
  color.addEventListener("click", () => {
    context.strokeStyle = color.dataset.color;
  });
});

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

clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width - 1, canvas.height - 1);
});

saveBtn.addEventListener("click", () => {
  const data = canvas.toDataURL();
  const a = document.createElement("a");

  a.href = data;
  a.download = "drawing.webp";

  a.click();
});
