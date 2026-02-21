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

let songIndex = 0;

const track = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const progress = document.getElementById('progress');
const title = document.querySelector('.track-name');
const credits = document.querySelector('.track-credits');

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song.replace('_', ' ');
  credits.innerText = songCredits[songIndex];
  track.src = `assets/audio/${song}.mp3`;
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