const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let numberOfParticles = 150;
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;
  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, velocity, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: getRandomInt(0, 10),
      y: getRandomInt(0, 10),
    };
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    //ctx.stroke();
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
    let radius = getRandomInt(0.5, 3);
    let x = getRandomInt(5, canvas.width - radius);
    let y = getRandomInt(5, canvas.height - radius);
    let color = getRandomColor(colorArray);
    particlesArray.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refresh canvas
  particlesArray.forEach((ptcl) => {
    ptcl.update(); //animation of every "particle (ptcl) in the particlesArray"
  });
}

init();
animate();
