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
  apiKey: 'AIzaSyCRuYQkeBmsSvk4YRURpxiKRh65MHoNYJ4',
  authDomain: 'cochat-3fadc.firebaseapp.com',
  projectId: 'cochat-3fadc',
  storageBucket: 'cochat-3fadc.appspot.com',
  messagingSenderId: '481715354722',
  appId: '1:481715354722:web:677e75a4720fe3db41e53b',
  measurementId: 'G-NNVWNV960B',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const db = getFirestore();

export const auth = getAuth(firebaseApp);
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
