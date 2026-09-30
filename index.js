const playPauseBtn = document.getElementById('play-pause');
const muteBtn = document.getElementById('mute-toggle');
const seekSlider = document.getElementById('seek-slider');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const audio = document.getElementById('audio');

if (audio) {
  const playPauseBtn = document.getElementById('play-pause');
  const muteBtn = document.getElementById('mute-toggle');
  const seekSlider = document.getElementById('seek-slider');
  const currentTimeSpan = document.getElementById('current-time');
  const durationSpan = document.getElementById('duration');
  const volumeSlider = document.getElementById('volume-slider');
}
const formatTime = (secs) => {
  if (!isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

audio.volume = volumeSlider.value / 100; // match the slider on load

playPauseBtn.addEventListener('click', () => {
  audio.paused ? audio.play() : audio.pause();
});
audio.addEventListener('play', () => playPauseBtn.classList.add('pause'));
audio.addEventListener('pause', () => playPauseBtn.classList.remove('pause'));

audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

let scrubbing = false;
seekSlider.addEventListener('pointerdown', () => (scrubbing = true));
seekSlider.addEventListener('pointerup', () => (scrubbing = false));

audio.addEventListener('timeupdate', () => {
  if (!scrubbing && audio.duration) {
    seekSlider.value = (audio.currentTime / audio.duration) * 100;
  }
  currentTimeSpan.textContent = formatTime(audio.currentTime);
});

seekSlider.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (seekSlider.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
  audio.muted = false;
});

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.classList.toggle('muted', audio.muted);
});