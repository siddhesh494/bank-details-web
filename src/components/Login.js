import React, { useState, useRef } from 'react'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { notifyError, notifySuccess } from '../utils/alert';

const Login = () => {

  const dispatch = useDispatch()

  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  const toggleForm = () => {
    setIsSignIn(prev => !prev)
  }

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    console.log( password.current.value)

    if(message) return


    // // signin / signup
    if(!isSignIn) {
      // sign up

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;

            dispatch(addUser({
              uid,
              email, 
              displayName
            }))
            navigate('/home')
            notifySuccess("User LoggedIn")

          }).catch((error) => {
            // An error occurred
            // const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            notifyError(errorMessage)
            setErrorMessage(`${errorMessage}`)
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          notifyError(errorMessage)
          setErrorMessage(`${errorMessage}`)
        });

    } else {
      // sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          // const user = userCredential.user;
          notifySuccess("User LoggedIn")
          navigate('/home')
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          notifyError(errorMessage)
          setErrorMessage(`${errorMessage}`)
        });
    }

  }

  return ( 
    <>
    <Header />
    <div className='flex items-center justify-center h-screen'>
      <div className='border border-black w-1/3 min-w-72 flex items-center justify-center flex-col p-10 rounded-lg'>
        <p className='text-3xl font-bold'>{isSignIn ? "Sign In" : "Sign Up"}</p>
        {!isSignIn ? (
          <input 
            ref={name}
            type='text'
            placeholder='Full Name'
            className='p-2 m-2 border border-black w-full rounded-lg'
          />
        ) : null}
        <input 
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-2 m-2 border border-black w-full rounded-lg'
        />
        <input 
          ref={password}
          type='password'
          placeholder='Password'
          className='p-2 m-2 border border-black w-full rounded-lg'
        />
        <p className='text-red-500 text-sm py-2' >{errorMessage}</p>
        <button 
          onClick={handleButtonClick}
          className='px-4 m-2 py-2 border  w-full bg-red-500 rounded-lg text-white'
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div>
          <span className='text-sm font-thin mr-2'>{isSignIn ? "New to Apna Bank?" : "Already register?"}</span>
          <span className='text-sm font-medium cursor-pointer underline' onClick={toggleForm}>{isSignIn ? "Sign up now" : "Sign in"}</span>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Login