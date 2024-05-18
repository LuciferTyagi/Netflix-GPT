import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../Utils/constant";

const GptSearch = () => {
  return (
    <div>
         <div className="background-img absolute before:content-none left-0 top-0 w-[100%] h-[100%] bg-center z-[-20]">
        <img
          src={BG_URL}
          alt="logo"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
