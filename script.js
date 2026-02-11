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

const track = document.getElementById('audio');
const playButton = document.getElementById('play');
const progress = document.getElementById('progress');

let isPlaying = false;

function togglePlay() {
  if (isPlaying)
    pauseSong();
  else
    playSong();
}

function playSong() {
  isPlaying = true;
  playButton.innerText = '⏸️';
  track.play();
}

function pauseSong() {
  isPlaying = false;
  playButton.innerText = '▶️';
  track.pause();
}

playButton.addEventListener('click', togglePlay);

track.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});