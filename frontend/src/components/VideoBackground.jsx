import React from "react";
import liveBg from "../assets/liveBg.mp4";

function VideoBackground() {
  return (
    <>
      <video
        muted
        autoPlay
        loop
        className="w-screen h-screen object-cover object-center fixed top-0 left-0"
      >
        <source src={liveBg} type="video/mp4" />
        Your Browser does not support the video tag
      </video>
    </>
  );
}

export default VideoBackground;
