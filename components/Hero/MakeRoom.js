import { createRoom } from '@/config/firebase';

const MakeRoomButtonHandler = async () => {
  alert('Success Created Room with ID : ' + (await createRoom()));
};

const MakeRoom = () => {
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
