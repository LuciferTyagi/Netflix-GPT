import React from "react";

import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo)
  useMovieTrailer(movieId);
  return (
    <div >
     <iframe
  className="w-screen aspect-video"
  src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1"}
  title="Kingdom of the Planet of the Apes | Final Trailer"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>

    </div>
  );
};

export default VideoBackground;
