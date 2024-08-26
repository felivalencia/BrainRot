import React, { useState } from "react";

const VideoUploader = ({ onVideoUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUploader;
