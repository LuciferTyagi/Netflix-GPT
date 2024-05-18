import React from "react";
import lang from "../Utils/languageConstant";
import { useSelector } from "react-redux";
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12 rounded-lg">
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
