import React, { useEffect } from "react";
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../Utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO } from "../Utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    
    signOut(auth)
      .then(() => {
       
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const  unsubscribe = onAuthStateChanged(auth, (user) => {
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
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="fixed w-full py-[25px] px-[60px] bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-[160px] "
        src={LOGO}
        alt="logo"
      />
      {user && <div className="flex p-2">
        <img
          src={user?.photoURL}
          alt="userIcon"
          className="w-12 h-12 rounded-lg m-1"
        ></img>
        <button onClick={handleSignOut} className="font-bold text-white">
        
          Sign-Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
