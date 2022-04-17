import DialogChat from '@/components/DialogChat';
import HeadChat from '@/components/HeadChat';
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';

const ChatRoom = () => {
  const router = useRouter();
  const { code } = router.query;
  console.log(router.query);

  return (
    <>
      <SEO
        url={`https://co-chat.vercel.app/${code}`}
        openGraphType="website"
        schemaType="Chat Room"
        title={`CoChat Room - ${code}`}
        description="CoChat hadir untuk memberikan kedaulatan layanan pesan sementara secara instan Indonesia dengan keamanan yang terjamin."
        image="/logo.png"
      />
      <div className="mx-auto flex max-w-7xl flex-col border-2 bg-white relative">
        <HeadChat image="/img/taubat.jpg" nameRoom="Remaja Taubat" />
        <DialogChat />
      </div>
    </>
  );
};

export default ChatRoom;
