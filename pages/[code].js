import DialogChat from '@/components/DialogChat';
import HeadChat from '@/components/HeadChat';
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ChatRoom = ({ code }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/');
        toast.error('Silahkan login terlebih dahulu');
      } else {
        setIsLoading(false);
      }
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [router, user]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen w-full flex">
          <div className="m-auto">
            <Image
              src="/gif/loading.gif"
              width={230}
              height={230}
              alt="Loading"
            />
          </div>
        </div>
      ) : (
        <>
          <SEO
            url={`https://co-chat.vercel.app/${code}`}
            openGraphType="website"
            schemaType="Chat Room"
            title={`CoChat Room - ${code}`}
            description="Yuk kita chat ria di CoChat."
            image="/logo.png"
          />
          <div className="mx-auto max-w-7xl border-2 bg-white">
            <HeadChat image="/img/taubat.jpg" nameRoom="Remaja Taubat" />
            <DialogChat code={code} />
          </div>
        </>
      )}
    </>
  );
};

export const getServerSideProps = ({ params: { code } }) => {
  return { props: { code } };
};

export default ChatRoom;
