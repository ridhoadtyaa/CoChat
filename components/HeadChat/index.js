import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MenuChat from './MenuChat';

const HeadChat = ({ code }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      setData(doc.data());
    });
  }, [code]);

  return (
    <header className="items-center flex justify-between bg-slate-100 px-8 py-3 z-10 fixed w-full max-w-7xl top-0">
      <div className="flex items-center space-x-4">
        <div>
          <Image
            className="rounded-full"
            src={
              data.room_picture ??
              'https://firebasestorage.googleapis.com/v0/b/cochat-3fadc.appspot.com/o/room_picture%2FGroup-of-People.jpg?alt=media&token=10948287-5867-4680-94ac-b0508f21cf16'
            }
            alt={data.room_name + ' picture'}
            height={40}
            width={40}
          />
        </div>
        <div className="self-center font-semibold">{data.room_name}</div>
      </div>
      <MenuChat />
    </header>
  );
};

export default HeadChat;
