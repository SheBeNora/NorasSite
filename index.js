const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const seekSlider = document.getElementById('seek-slider');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

// Helper to format track time (seconds -> MM:SS)
const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// 1. Play / Pause Toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.classList.add('pause');
  } else {
    audio.pause();
    playPauseBtn.classList.remove('pause');
  }
});

// 2. Load Track Metadata (Duration)
audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

// 3. Update Timeline Progress Bar as Audio Plays
audio.addEventListener('timeupdate', () => {
  if (!seekSlider.matches(':focus')) { // Don't snap while user is scrubbing
    const progress = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = progress || 0;
  }
  currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// 4. Scrubbing / Seeking through the Track
seekSlider.addEventListener('input', () => {
  const time = (seekSlider.value / 100) * audio.duration;
  audio.currentTime = time;
});

// 5. Volume Management
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});
