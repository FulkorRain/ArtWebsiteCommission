const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const images = [];
["assets/images/Pink.png","assets/images/Green.png","assets/images/Orange.png","assets/images/Purple.png","assets/images/Yellow.png","assets/images/Blue.png"]
  .forEach(src => {
    const img = new Image();
    img.src = src;
    images.push(img);
  });

const particles = Array.from({length: 200}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  speed: 2 + Math.random() * 3,
  img: images[Math.floor(Math.random() * images.length)]
}));

function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (const p of particles) {
    p.y += p.speed;

    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }

    ctx.drawImage(p.img, p.x, p.y, 12, 12);
  }

  requestAnimationFrame(loop);
}

loop();