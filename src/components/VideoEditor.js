import React, { useState } from "react";

const VideoEditor = ({ originalVideo, onProcessVideo }) => {
  const [clipDuration, setClipDuration] = useState(60);

  const handleDurationChange = (e) => {
    setClipDuration(parseInt(e.target.value));
  };

  const handleProcessVideo = () => {
    onProcessVideo(clipDuration);
  };

  return (
    <div>
      <select onChange={handleDurationChange} value={clipDuration}>
        <option value={60}>1 minute</option>
        <option value={300}>5 minutes</option>
      </select>
      <button onClick={handleProcessVideo} disabled={!originalVideo}>
        Process Video
      </button>
    </div>
  );
};

export default VideoEditor;
