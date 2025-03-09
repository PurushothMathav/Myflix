document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("movieVideo");

  // Autoplay the video when the page loads
  video.play();

  // Debugging: Check if video time updates
  video.addEventListener("timeupdate", () => {
    console.log("Current Time:", video.currentTime);
  });

  // Add keyboard event listener for custom controls
  document.addEventListener("keydown", (event) => {
    // Prevent default behavior only for specific keys
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
      event.preventDefault(); // Only prevent default for relevant keys
    }

    console.log("Key pressed:", event.key); // Debugging log

    if (!video || video.readyState < 2) {
      console.error("Video not ready for playback.");
      return;
    }

    switch (event.key) {
      case "ArrowRight": // Forward
        console.log("Forwarding video by 10 seconds");
        console.log("Current Time BEFORE Forward:", video.currentTime);
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
        console.log("Current Time AFTER Forward:", video.currentTime);
        break;

      case "ArrowLeft": // Backward
        console.log("Rewinding video by 10 seconds");
        console.log("Current Time BEFORE Backward:", video.currentTime);
        video.currentTime = Math.max(video.currentTime - 10, 0);
        console.log("Current Time AFTER Backward:", video.currentTime);
        break;

      case "ArrowUp": // Volume Up
        console.log("Increasing volume");
        video.volume = Math.min(video.volume + 0.1, 1);
        break;

      case "ArrowDown": // Volume Down
        console.log("Decreasing volume");
        video.volume = Math.max(video.volume - 0.1, 0);
        break;

      case " ": // Spacebar for play/pause
        console.log(video.paused ? "Playing video" : "Pausing video");
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;

      default:
        console.log("Unrecognized key, no action taken.");
        break; // Ignore other keys
    }
  });
});
