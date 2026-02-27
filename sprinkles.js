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

const trail = [];

addEventListener("mousemove", e => {
  for (let i = 0; i < 3; i++) {
    trail.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      life: 1,
      size: 8 + Math.random() * 6,
      img: images[Math.floor(Math.random() * images.length)]
    });
  }
});

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


  for (let i = trail.length - 1; i >= 0; i--) {
    const p = trail[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.life -= 0.03;

    ctx.globalAlpha = p.life;
    ctx.drawImage(p.img, p.x, p.y, p.size, p.size);

    if (p.life <= 0) trail.splice(i, 1);
  }

  ctx.globalAlpha = 1;

  requestAnimationFrame(loop);
}

loop();