import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import ButtonIcon from '@/components/ButtonIcon';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore();

export const auth = getAuth(app);
auth.languageCode = 'id';

export const Authentication = () => {
  return auth;
};

export const createRoom = async () => {
  const randomRoomID = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  try {
    const roomID =
      randomRoomID(3).toUpperCase() + '-' + randomRoomID(3).toUpperCase() + '-' + randomRoomID(3).toUpperCase();
    await setDoc(doc(db, 'room-chat', roomID), {
      room_code: roomID,
      room_master: auth.currentUser.uid,
      room_name: 'Room ' + roomID,
      room_description: '',
      room_picture:
        'https://firebasestorage.googleapis.com/v0/b/cochat-3fadc.appspot.com/o/Group-of-People.jpg?alt=media&token=85935fc7-4499-4db7-8779-44fc6a0caf0d',
      room_state: 'active',
      room_created_at: new Date(),
      chats: [],
    });
    return roomID;
  } catch (error) {
    console.log('🚀 ~ file: firebase.js ~ line 76 ~ createRoom ~ error', error);
  }
};

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Login Berhasil!');
        // console.log(GoogleAuthProvider.credentialFromResult(result));
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(error.message);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Login Berhasil!');
        // console.log(FacebookAuthProvider.credentialFromResult(result));
      })
      .catch((error) => {
        const credential = FacebookAuthProvider.credentialFromError(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="mt-6 flex justify-between">
      <ButtonIcon onClick={signInWithGoogle} icon="/svg/google.svg">
        Google
      </ButtonIcon>
      <ButtonIcon onClick={signInWithFacebook} icon="/svg/facebook.svg">
        Facebook
      </ButtonIcon>
    </div>
  );
};
