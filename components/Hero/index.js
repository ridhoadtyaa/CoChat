import Image from 'next/image';
import { CodeForm } from './form';
import { SignIn, auth } from 'config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Hero = () => {
  const [user] = useAuthState(auth);

  return (
    <section className="container mx-auto py-16 md:flex md:flex-row-reverse">
      <div className="w-full md:pl-8 lg:w-5/12">
        <h1 className="text-3xl leading-snug 2xl:text-4xl">
          Nikmati group chat dengan mudah dimanapun dan kapanpun{' '}
        </h1>
        <p className="mt-6 opacity-60 lg:text-lg">
          CoChat hadir untuk memberikan kedaulatan layanan pesan sementara
          secara instan Indonesia dengan keamanan yang terjamin
        </p>

        {user ? <CodeForm /> : <SignIn />}
      </div>
      <div className="mt-16 w-full lg:relative lg:-top-10 lg:mt-0 lg:w-7/12">
        <Image src="/img/hero.png" alt="hero" width="675" height="544" />
      </div>
    </section>
  );
};

export default Hero;
