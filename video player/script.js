const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const forwardBtn = document.getElementById("forward");
const rewindBtn = document.getElementById("rewind");
const fullscreenBtn = document.getElementById("fullscreen");
const pipBtn = document.getElementById("pip");
const speedSelect = document.getElementById("speed");

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = "⏸";
  } else {
    video.pause();
    playPauseBtn.innerHTML = "▶️";
  }
});

// Volume
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

// Mute / Unmute
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});

// Skip
forwardBtn.addEventListener("click", () => {
  video.currentTime += 10;
});

rewindBtn.addEventListener("click", () => {
  video.currentTime -= 10;
});

// Fullscreen
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Picture-in-Picture
pipBtn.addEventListener("click", async () => {
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else {
    await video.requestPictureInPicture();
  }
});

// Playback Speed
speedSelect.addEventListener("change", () => {
  video.playbackRate = speedSelect.value;
});
