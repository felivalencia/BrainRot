import React from "react";

const VideoPlayer = ({ topVideoSrc, bottomVideoSrc }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <video
        src={topVideoSrc}
        controls
        style={{ width: "100%", height: "50%" }}
      />
      <video
        src={bottomVideoSrc}
        controls
        style={{ width: "100%", height: "50%" }}
      />
    </div>
  );
};

export default VideoPlayer;
