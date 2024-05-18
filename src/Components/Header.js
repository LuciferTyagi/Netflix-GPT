import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../Utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../Utils/constant";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configslice";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClik = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="fixed w-full py-[25px] px-[60px] bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-[160px] " src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <select
            className="p-2 bg-gray-900 text-white m-2 rounded-lg"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleGptSearchClik}
            className="py-2 px-4 mx-4 my-2 bg-purple-800 rounded-lg text-white"
          >
            GPT-Search
          </button>
          <img
            src={user?.photoURL}
            alt="userIcon"
            className="w-12 h-12 rounded-lg m-1"
          ></img>
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
