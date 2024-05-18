import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>
      <div class="">
        <button class="mr-2 bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-2 px-12  rounded ">
          ▶️Play
        </button>

        <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg py-2 px-12 rounded">
          ℹ️More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
