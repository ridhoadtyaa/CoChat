import { useState } from 'react';
import ChatMessage from './ChatMessage';
import chatRoomStyles from '../../styles/chat-room';
import { useEffect } from 'react';
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '@/config/firebase';

// export const getServerSideProps = ({ params: { code } }) => {
//   console.log(code);
//   return { props: { code } };
// };

const DialogChat = ({ code }) => {
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [data, setData] = useState({});

  const changeHandler = (e) => {
    setMessage(e.target.value);
    message.length > 1 ? setDisableButton(false) : setDisableButton(true);
  };

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      console.log('Current data: ', doc.data());
      setData(doc.data());
    });
  }, [code]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await updateDoc(doc(db, 'room-chat', code), {
      chats: [
        ...data.chats,
        {
          text: message,
          createdAt: Timestamp.now(),
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
        },
      ],
    });
  };

  return (
    <>
      <section className="h-screen">
        <main className="h-[90vh] space-y-10 overflow-y-scroll px-4 pt-24 pb-10">
          {data.chats &&
            data.chats.map((chat) => (
              <ChatMessage
                text={chat.text}
                namaUser={chat.displayName}
                pictureUser={chat.photoURL}
                date="todsada"
                key={chat.id}
                self={chat.uid === auth.currentUser.uid}
              />
            ))}
          {/* <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          />
          <ChatMessage
            text="Waalaikumsalam, tidak apa jika internetnya lancar."
            nameUser="Ustadz Solmed"
            pictureUser="/img/solmed.jpg"
            date="Today, at 15:30"
            self
          />
          <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          />
          <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          />
          <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          />
          <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          />
          <ChatMessage
            text="Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom menurut Imam Syafii apa ya, Ustadz? Syukron before."
            nameUser="Ahmad Rifai"
            pictureUser="/img/orang.jpeg"
            date="Today, at 15:30"
          /> */}
        </main>
        <style jsx>{chatRoomStyles}</style>
      </section>

      <form onSubmit={sendMessage}>
        <div className="fixed bottom-0 flex w-full max-w-7xl items-center border-y-2 border-slate-100 bg-white p-2">
          <input
            type="text"
            placeholder="Type a message"
            className="block h-full w-full border-slate-200 px-8 text-lg outline-none placeholder:text-slate-500"
            value={message}
            onChange={changeHandler}
          />
          <button
            className={`flex h-14 w-16 transition ${
              disableButton ? 'cursor-not-allowed bg-blue-800' : 'bg-primary'
            }`}
            type="submit"
            disabled={disableButton}
          >
            {/* prettier-ignore */}
            <svg className={`m-auto transition ${disableButton ? 'fill-slate-400' : 'fill-white'}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path d="M1.724 1.053a.5.5 0 0 0-.714.545l1.403 4.85a.5.5 0 0 0 .397.354l5.69.953c.268.053.268.437 0 .49l-5.69.953a.5.5 0 0 0-.397.354l-1.403 4.85a.5.5 0 0 0 .714.545l13-6.5a.5.5 0 0 0 0-.894l-13-6.5Z"/></svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default DialogChat;
