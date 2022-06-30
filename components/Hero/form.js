import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const CodeForm = () => {
  const router = useRouter();
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!inputCode) {
      toast.error('Isi kode terlebih dahulu!');
      return;
    }

    setLoading(true);
    const docRef = doc(db, 'room-chat', inputCode);
    const docSnap = await getDoc(docRef);
    if (docSnap.data() === undefined || docSnap.data().room_state === 'inactive') {
      toast.error('Ruangan chat tidak ditemukan');
      setInputCode('');
    } else {
      router.push(`/${inputCode}`);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Ketik kode ruangan chat di sini..."
          className={`mt-4 block w-full rounded-full border-2 border-blue-500/60 py-2 px-10 focus:outline-none ${
            loading && 'cursor-not-allowed border-blue-600'
          }`}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-2" disabled={loading}>
          <Image
            src={loading ? '/gif/circle-loading.gif' : '/svg/arrow.svg'}
            width={loading ? 25 : 30}
            height={loading ? 25 : 30}
            alt="Go"
          />
        </button>
      </form>
    </div>
  );
};

export default CodeForm;
