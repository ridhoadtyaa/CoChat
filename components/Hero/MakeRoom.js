import { createRoom } from '@/config/firebase';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const MakeRoom = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const MakeRoomButtonHandler = async () => {
    setIsLoading(true);
    try {
      const roomID = await createRoom();
      router.push(`/${roomID}`);
      toast.success('Berhasil membuat room, selamat datang!');
    } catch {
      toast.error('Terdapat kesalahan, coba lagi nanti');
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={MakeRoomButtonHandler}
      disabled={isLoading}
      className={`w-full rounded-full border-2 border-blue-500/60 py-2 font-semibold ${
        isLoading && 'cursor-not-allowed border-blue-600'
      }`}
    >
      {!isLoading ? (
        'Buat Ruang Chat'
      ) : (
        <div className="relative -bottom-1">
          <Image src="/gif/make-room-loading.gif" width={18} height={18} alt="Loading" />
        </div>
      )}
    </button>
  );
};

{
  /* <Image
        src="/gif/make-room-loading.gif"
        width={20}
        height={20}
        alt="Loading"
      /> */
}

export default MakeRoom;
