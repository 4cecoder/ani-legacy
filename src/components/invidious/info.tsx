async function getVideoInfo(videoId: string): Promise<any> {
  const response = await fetch(
    `https://invidious.snopyta.org/api/v1/videos/\${videoId}`
  );
  return await response.json();
}

async function playVideo(videoId: string): Promise<void> {
  const videoInfo = await getVideoInfo(videoId);

  const videoElement = document.createElement("video");
  videoElement.controls = true;

  const desiredFormat = videoInfo.formats.find((format: any) =>
    format.type.includes("mp4")
  );
  videoElement.src = desiredFormat.url;
  document.body.appendChild(videoElement);
  await videoElement.play();
}

export { playVideo };
