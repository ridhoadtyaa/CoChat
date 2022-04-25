import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import ButtonIcon from '../components/ButtonIcon';

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

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert('Login berhasil!');
        console.log(GoogleAuthProvider.credentialFromResult(result));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorCode);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(FacebookAuthProvider.credentialFromResult(result));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        alert(errorCode);
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
