import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { USER_AVATAR } from "../Utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonCLick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value
      // name.current.value
    );

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign-Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
     
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            }); 

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign-In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="background-img absolute before:content-none left-0 top-0 w-[100%] h-[100%] bg-center">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <div className="form-wrapper absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-black opacity-75 p-[60px] rounded-[4px] w-[430px]">
        <h2 className="text-white text-[2rem]">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-[25px] mx-0 mb-[60px] "
        >
          {!isSignInForm && (
            <div className="form-control h-[50px] mb-[16px]">
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                required
                className="h-[100%] text-white w-[100%] bg-[#333] outline-none border-none text-[1rem] rounded-[4px] py-0 px-[20px]"
              />
              {/* <label className='absolute left-[20px] top-[50%] text-[#8c8c8c] pointer-events-none text-[1rem] transform -translate-x-[50%]'>Full Name</label> */}
            </div>
          )}

          <div className="form-control h-[50px] mb-[16px]">
            <input
              ref={email}
              type="text"
              placeholder="Email-Address"
              required
              className="h-[100%] w-[100%] bg-[#333] outline-none border-none text-[1rem] rounded-[4px] py-0 px-[20px] text-white"
            />
            {/* <label className='absolute left-[20px] top-[50%] text-[#8c8c8c] pointer-events-none text-[1rem] transform -translate-x-[50%]'>Email or Phone</label> */}
          </div>

          <div className="form-control h-[50px] mb-[16px]">
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="h-[100%] text-white w-[100%] bg-[#333] outline-none border-none text-[1rem] rounded-[4px] py-0 px-[20px]"
            />
            {/* <label className='absolute left-[20px] top-[50%] text-[#8c8c8c] pointer-events-none text-[1rem] transform -translate-x-[50%]' >Password</label> */}
          </div>
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
          <button
            onClick={handleButtonCLick}
            className="w-[100%] py-[16px] px-[0] text-[1rem] border-none outline-none text-white cursor-pointer font-[500] bg-[#e50914] mt-[25px] mx-0 mb-[60px] rounded-md"
            type="submit"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="form-help flex content-between">
            <div className="Remember-me">
              <input type="checkbox" className="remember-me" />
              <label for="remember-me" className="text-white m-2">
                Remember me
              </label>
            </div>
            <a href="/login">Need Help?</a>
          </div>
        </form>
        <p className="text-white cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix?Sign up"
            : "Already registerd?Sing In Now"}
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
          <a href="/login">Learn more.</a>
        </small>
      </div>
    </div>
  );
};

export default Login;
