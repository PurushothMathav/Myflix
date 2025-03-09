document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("movieVideo");
  const videoSource = document.getElementById("videoSource");
  const subtitleSelect = document.getElementById("subtitleSelect");
  const subtitles = [
    { label: "English", lang: "en" },
    { label: "Indonesian", lang: "id" },
    { label: "Malay", lang: "ms" },
    { label: "Arabi", lang: "ar" },
    { label: "Khmer", lang: "km" },
  ];

  // Get the movie file from the query string
  const params = new URLSearchParams(window.location.search);
  const movieFile = params.get("movie");

  if (movieFile) {
    // Set the video source dynamically
    videoSource.src = movieFile;
    video.load();

    // Clear existing <track> elements
    const existingTracks = video.querySelectorAll("track");
    existingTracks.forEach((track) => track.remove());

    // Add new <track> elements for subtitles
    subtitles.forEach((subtitle, index) => {
      const track = document.createElement("track");
      track.label = subtitle.label;
      track.kind = "subtitles";
      track.srclang = subtitle.lang;
      track.src = `subtitles/${movieFile.split('.')[0]}-${subtitle.lang}.vtt`;
      if (index === 0) {
        track.default = true; // Set the first subtitle as default
      }
      video.appendChild(track);
    });

    video.load(); // Reload the video with new tracks
    video.play();
  } else {
    console.error("No movie specified in the query string.");
  }

  // Handle subtitle switching
  subtitleSelect.addEventListener("change", () => {
    const textTracks = video.textTracks; // Access video text tracks
    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = i === parseInt(subtitleSelect.value) ? "showing" : "hidden";
    }
  });
});
