import React, { useState } from "react";
import ReactPlayer from 'react-player'

function VideoView(videoFilePath) {
  const [vidFilePath, setVidFilePath] = useState(videoFilePath)

  return (
    <>
      <ReactPlayer url={vidFilePath} />
    </>
  );
}

export default VideoView;
