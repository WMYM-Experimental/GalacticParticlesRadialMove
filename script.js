const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let numberOfParticles = 6000;
let radians = 0;
let alpha = 1;
let mouseDown = false;

const colorArray = [
  "#d6d9de",
  "#fce0d4",
  "#e0858c",
  "#b84f60",
  "#b57389",
  "#a88893",
  "#005f73",
  "#0a9396",
  "#b7094c",
  "#a663cc",
  "#ffc857",
  "#f6b684",
];

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//keydown spacebar event
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  }
});

addEventListener("mousedown", () => {
  mouseDown = true;
});

addEventListener("mouseup", () => {
  mouseDown = false;
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.radius;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let particlesArray;
function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let radius = getRandomInt(0.2, 2);
    let x = getRandomInt(-3 * canvas.width, canvas.width - radius);
    let y = getRandomInt(-3 * canvas.height, canvas.height - radius);
    let color = getRandomColor(colorArray);
    particlesArray.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);

  particlesArray.forEach((ptcl) => {
    ptcl.update(); //animation of every "particle (ptcl) in the particlesArray"
  });

  ctx.restore();

  radians += 0.003;

  if (mouseDown && alpha >= 0.03) {
    alpha -= 0.01;
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01;
  }
}

init();
animate();
