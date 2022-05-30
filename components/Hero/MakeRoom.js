import { createRoom } from '@/config/firebase';
import { useRouter } from 'next/router';

const MakeRoom = () => {
  const router = useRouter();
  const MakeRoomButtonHandler = async () => {
    const roomID = await createRoom();
    router.push(`/${roomID}`);
    alert('Success Created Room with ID : ' + roomID);
  };

  return (
    <button
      onClick={MakeRoomButtonHandler}
      className="w-full rounded-full border-2 border-blue-500/60 py-2 font-semibold"
    >
      Buat Ruang Chat
    </button>
  );
};

export default MakeRoom;
