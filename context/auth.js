import { useEffect, useState } from 'react';
import { Authentication } from '@/services/firebase';
import { InitialUserState, useUser } from './user';
import Image from 'next/image';

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        SetUser({ email: user.email, uid: user.uid, name: user.displayName, photoUrl: user.photoURL, isLogin: true });
      } else {
        SetUser(InitialUserState);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full text-center">
        <Image src="/gif/loading-screen.gif" width={200} height={200} alt="Loading" />
      </div>
    );
  }

  return children;
};

export default AuthStateChangeProvider;
