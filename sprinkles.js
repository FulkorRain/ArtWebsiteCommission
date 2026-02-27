const images = [
  "assets/images/Pink.png",
  "assets/images/Green.png",
  "assets/images/Orange.png",
  "assets/images/Purple.png",
  "assets/images/Yellow.png",
  "assets/images/Blue.png"
];

const container = document.getElementById("sprinkle-container");

function spawnSprinkle() {
  const img = document.createElement("img");

  img.src = images[Math.floor(Math.random() * images.length)];
  img.className = "sprinkle";

  img.style.left = Math.random() * window.innerWidth + "px";

  const size = 8 + Math.random() * 10;
  img.style.width = size + "px";

  const duration = 2 + Math.random() * 4;
  img.style.animationDuration = duration + "s";

  container.appendChild(img);

  setTimeout(() => img.remove(), duration * 1000);
}

setInterval(spawnSprinkle, 120);