import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../utils/alert';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(addUser({
          uid,
          email, 
          displayName
        }))
        navigate('/home')

      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
        
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe()
    // eslint-disable-next-line
  }, [])


  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
      notifySuccess("User Logged Out")
    }).catch((error) => {
      // An error happened.
      // navigate to error page

      notifyError("Error while logging out")
    });
  }


  return (
    <div className='bg-blue-500 p-5 w-full flex flex-row justify-between'>
      <div>
        <h1 className='text-3xl text-white font-bold'>Apna Bank</h1>
      </div>
      {!user ? (
        null
      ) : (
        <div>
          <button
            onClick={handleSignOut}
            className='px-5 py-2 rounded-lg bg-red-600 text-white'
          >
            Logout
          </button>
        </div>
      )}
      
    </div>
  )
}

export default Header