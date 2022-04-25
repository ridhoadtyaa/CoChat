import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const CodeForm = () => {
  const router = useRouter();
  const [inputCode, setInputCode] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/${inputCode}`);
  };

  return (
    <div className="relative">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Ketik kode ruangan chat di sini..."
          className="mt-4 block w-full rounded-full border-2 border-blue-500/60 py-2 px-10 focus:outline-none"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-2">
          <Image src="/svg/arrow.svg" width="30" height="30" alt="Go" />
        </button>
      </form>
    </div>
  );
};
