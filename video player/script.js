const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const forwardBtn = document.getElementById("forward");
const rewindBtn = document.getElementById("rewind");
const fullscreenBtn = document.getElementById("fullscreen");
const pipBtn = document.getElementById("pip");
const speedSelect = document.getElementById("speed");
const subtitleBtn = document.getElementById("subs");
const playlistItems = document.querySelectorAll(".playlist li");

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

// Mute
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

// Speed
speedSelect.addEventListener("change", () => {
  video.playbackRate = speedSelect.value;
});

// Subtitles toggle
subtitleBtn.addEventListener("click", () => {
  const tracks = video.textTracks;
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].mode = tracks[i].mode === "showing" ? "hidden" : "showing";
  }
});

// Playlist
playlistItems.forEach(item => {
  item.addEventListener("click", () => {
    video.src = item.getAttribute("data-src");
    video.play();
  });
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case " ":
      e.preventDefault();
      playPauseBtn.click();
      break;
    case "f":
      fullscreenBtn.click();
      break;
    case "m":
      muteBtn.click();
      break;
    case "arrowright":
      forwardBtn.click();
      break;
    case "arrowleft":
      rewindBtn.click();
      break;
  }
});

// Touch gesture support (basic)
let startX = 0;
video.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

video.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) video.currentTime -= 10; // swipe right
  else if (diff < -50) video.currentTime += 10; // swipe left
});
