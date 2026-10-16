function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000)
updateClock();


function copyLink() {
  const code = `<a href="https://fulkorrain.github.io/ArtWebsiteCommission/">
  <img src="https://cdn.discordapp.com/attachments/1447239459539255440/1452342648751915119/IMG_4531.gif?ex=694976fe&is=6948257e&hm=cc7f84cca832ca2dcd8c15d594fa6b4ca134dd7d92dfc7276cb11a58bf4f5eed" alt="Link me">
</a>`;

  navigator.clipboard.writeText(code);
}

// Button press sounds
const buttonAudio = new Audio("assets/audio/click_sound.mp3");
buttonAudio.volume = 0.2;
const buttons = document.querySelectorAll(".action-button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttonAudio.currentTime = 0;
    buttonAudio.play().catch(error => {
      console.error("Audio play failed:", error);
    });
  });
});
// Button press sounds

// #info song-name (both in file and what appears on the music box)
const songs = ["Crystal Strawberry Garden", "Maid Sama OST", "Maid Sama OST 2", "drops."];
// #info song-name (both in file and what appears on the music box)

// #info song-credits (in order)
const songCredits = ["Hello Kitty Dream Village", "Net idol AOI", "Misaki Junchou theme", "Elements Garden"]
// #info song-credits (in order)

// #info-song-img (in order)
const videoImage = [
  "https://file.garden/aStH4SBKNTw4mZIY/IMG_9441.png",
  "https://file.garden/aStH4SBKNTw4mZIY/IMG_9447.jpeg", 
  "https://file.garden/aStH4SBKNTw4mZIY/IMG_9443.png", 
  "https://file.garden/aStH4SBKNTw4mZIY/IMG_9442.png"]
// #info song-img (in order)

let songIndex = 0;

const track = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const progress = document.getElementById('progress');
const title = document.querySelector('.track-name');
const credits = document.querySelector('.track-credits');
const imageElement = document.getElementById('video-image');

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song.replace('_', ' ');
  credits.innerText = songCredits[songIndex];
  track.src = `assets/audio/${song}.mp3`;
  imageElement.style.backgroundImage = `url('${videoImage[songIndex]}')`;
}


function togglePlay() {
  const isPlaying = playButton.classList.contains('is-playing');
  if (isPlaying) pauseSong();
  else playSong();
}

function playSong() {
  playButton.classList.add("is-playing");
  track.play();
}

function pauseSong() {
  playButton.classList.remove("is-playing");
  track.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}


playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);


track.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
});

track.addEventListener('ended', nextSong);

const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', (e) => {
  track.volume = e.target.value;
});

// SPARKLE TRAIL

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.45) return;

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  sparkle.style.setProperty(
    "--x",
    (Math.random() * 50 - 25) + "px"
  );
  sparkle.style.fontSize = (Math.random() * 8 + 20) + "px";

  document.body.appendChild(sparkle);

  sparkle.addEventListener("animationend", () => sparkle.remove());
});

// Toybox

const toybox = document.querySelector("#toybox-play-area");

const toyImages = [
  { src: "https://file.garden/aStH4SBKNTw4mZIY/bunnysit.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/spoon.png", size: 88 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/petbed.png", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/bowl.png", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/popsicle.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/poptart.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/numnom.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/pinkcrown.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/Bluebowgraphic.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/bowgraphic.gif", size: 44 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/brush.png", size: 88 },
  { src: "https://file.garden/aStH4SBKNTw4mZIY/combgraphic.png", size: 44 }
];

const toys = [];

if (toybox) {
  toyImages.forEach((toy, index) => {
    const img = document.createElement("img");

    img.src = toy.src;
    img.alt = "Toy";
    img.className = "toybox-item";
    img.draggable = false;
    img.dataset.size = toy.size;

    img.style.width = `${toy.size}px`;
    img.style.height = `${toy.size}px`;
    img.style.left = `${(index * 31) % Math.max(1, toybox.clientWidth - toy.size)}px`;
    img.style.top = `${Math.floor(index / 3) * 42 + (index % 3) * 8}px`;

    toybox.appendChild(img);
    toys.push(img);

    img.addEventListener("pointerdown", startDrag);
  });
}

let activeToy = null;
let offsetX = 0;
let offsetY = 0;
let activePointerId = null;

function startDrag(event) {
  if (event.button !== 0 && event.pointerType === "mouse") return;

  event.preventDefault();

  const img = event.currentTarget;
  const rect = img.getBoundingClientRect();

  activeToy = img;
  activePointerId = event.pointerId;

  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  img.classList.add("is-free");
  document.body.appendChild(img);

  img.style.left = `${rect.left}px`;
  img.style.top = `${rect.top}px`;

  const size = Number(img.dataset.size) || 44;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.zIndex = "2147483647";

  img.setPointerCapture(event.pointerId);

  img.addEventListener("pointermove", dragToy);
  img.addEventListener("pointerup", stopDrag);
  img.addEventListener("pointercancel", stopDrag);
}

function dragToy(event) {
  if (!activeToy || event.pointerId !== activePointerId) return;

  event.preventDefault();

  const maxX = window.innerWidth - activeToy.offsetWidth;
  const maxY = window.innerHeight - activeToy.offsetHeight;

  const x = Math.max(0, Math.min(event.clientX - offsetX, maxX));
  const y = Math.max(0, Math.min(event.clientY - offsetY, maxY));

  activeToy.style.left = `${x}px`;
  activeToy.style.top = `${y}px`;
}

function stopDrag(event) {
  if (!activeToy || event.pointerId !== activePointerId) return;

  const img = activeToy;

  img.removeEventListener("pointermove", dragToy);
  img.removeEventListener("pointerup", stopDrag);
  img.removeEventListener("pointercancel", stopDrag);

  if (img.hasPointerCapture(event.pointerId)) {
    img.releasePointerCapture(event.pointerId);
  }

  activeToy = null;
  activePointerId = null;
}