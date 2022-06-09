import DialogChat from '@/components/DialogChat';
import HeadChat from '@/components/HeadChat';
import SEO from '@/components/SEO';
import { db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import withProtected from '@/hoc/withProtected';
import { toast } from 'react-toastify';

const ChatRoom = ({ code }) => {
  return (
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
        <HeadChat code={code} />
        <DialogChat code={code} />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params: { code } }) => {
  const docRef = doc(db, 'room-chat', code);
  const docSnap = await getDoc(docRef);
  if (docSnap.data() === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } else if (docSnap.data().room_state === 'inactive') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return { props: { code } };
};

export default withProtected(ChatRoom);
