import React, { useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

import VideoUploader from "./components/VideoUploader";
import VideoEditor from "./components/VideoEditor";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [originalVideo, setOriginalVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [satisfactoryVideo, setSatisfactoryVideo] = useState(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  useEffect(() => {
    loadFfmpeg();
  }, []);

const loadFfmpeg = async () => {
  const ffmpegInstance = new FFmpeg();
  try {
    await ffmpegInstance.load();
    setFfmpeg(ffmpegInstance);
    setFfmpegLoaded(true);
  } catch (error) {
    console.error("Failed to load FFmpeg:", error);
  }
};

  const handleVideoUpload = (file) => {
    setOriginalVideo(file);
  };

  const processVideo = async (duration) => {
    if (!originalVideo || !ffmpeg) return;

    try {
      await ffmpeg.writeFile("input.mp4", await fetchFile(originalVideo));

      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-t",
        duration.toString(),
        "-c",
        "copy",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      const processedVideoBlob = new Blob([data.buffer], { type: "video/mp4" });
      setProcessedVideo(URL.createObjectURL(processedVideoBlob));

      // For demonstration, we're using the same video for both top and bottom
      setSatisfactoryVideo(URL.createObjectURL(processedVideoBlob));
    } catch (error) {
      console.error("Error processing video:", error);
    }
  };

  if (!ffmpegLoaded) return <div>Loading FFmpeg...</div>;

  return (
    <div className="App">
      <h1>Video Content Creator</h1>
      <VideoUploader onVideoUpload={handleVideoUpload} />
      <VideoEditor
        originalVideo={originalVideo}
        onProcessVideo={processVideo}
      />
      {processedVideo && satisfactoryVideo && (
        <VideoPlayer
          topVideoSrc={processedVideo}
          bottomVideoSrc={satisfactoryVideo}
        />
      )}
    </div>
  );
}

export default App;
