let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

let context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeRect(0, 0, canvas.width, canvas.height);

