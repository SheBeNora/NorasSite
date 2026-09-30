const bgm = document.getElementById("bgm");
bgm.volume = 0.1;

bgm.addEventListener("error", (e) => {
  console.error("Audio source failed:", e.target.src || e.target.currentSrc);
}, true);

bgm.addEventListener("canplaythrough", () => {
  console.log("Audio loaded and ready:", bgm.currentSrc);
});

const events = ["pointerdown", "keydown", "touchend"];

function tryPlay() {
  bgm.play()
    .then(() => {
      console.log("Playing!");
      events.forEach(e => document.removeEventListener(e, tryPlay));
    })
    .catch(err => console.warn("Play blocked or failed:", err.name, err.message));
}

tryPlay();
events.forEach(e => document.addEventListener(e, tryPlay));