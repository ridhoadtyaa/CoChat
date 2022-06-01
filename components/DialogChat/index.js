import chatRoomStyles from '@/styles/chat-room';
import { auth, db } from '@/config/firebase';
import ChatMessage from './ChatMessage';
import { Timestamp, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

const DialogChat = ({ code }) => {
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [data, setData] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const dummy = useRef();

  const changeHandler = (e) => {
    setMessage(e.target.value);
    e.target.value.length > 0 ? setDisableButton(false) : setDisableButton(true);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    setDisableButton(true);

    const { uid, photoURL, displayName } = auth.currentUser;
    if (message.length > 0) {
      setSendLoading(true);
      await updateDoc(doc(db, 'room-chat', code), {
        chats: [
          ...data.chats,
          {
            id: Date.now(),
            text: message,
            createdAt: Timestamp.now(),
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
          },
        ],
      });
      setSendLoading(false);
      setMessage('');
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      setData(doc.data());
    });
  }, [code]);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  return (
    <>
      <section className="h-screen">
        <main className="h-screen space-y-10 overflow-y-scroll px-4 py-24">
          {data.chats ? (
            data.chats.map((chat) => (
              <ChatMessage
                text={chat.text}
                nameUser={chat.displayName}
                pictureUser={chat.photoURL}
                date={chat.createdAt.toDate().toDateString()}
                key={chat.id}
                self={chat.uid === auth.currentUser.uid}
              />
            ))
          ) : (
            <div className="flex justify-center">
              <Image src="/gif/make-room-loading.gif" width={40} height={40} alt="Loading" />
            </div>
          )}
          <span ref={dummy}></span>
        </main>
        <style jsx>{chatRoomStyles}</style>
      </section>

      <form onSubmit={sendMessage}>
        <div className="fixed bottom-0 flex w-full max-w-7xl items-center border-y-2 border-slate-100 bg-white p-2">
          <input
            type="text"
            placeholder="Type a message"
            className="block h-full w-full border-slate-200 px-4 text-lg outline-none placeholder:text-slate-500 sm:px-8"
            value={message}
            onChange={changeHandler}
            onPaste={() => setDisableButton(false)}
          />
          <button
            className={`flex h-14 w-16 transition ${disableButton ? 'cursor-not-allowed bg-blue-800' : 'bg-primary'}`}
            type="submit"
            disabled={disableButton}
          >
            {sendLoading ? (
              <div className="relative -bottom-1 m-auto">
                <Image src="/gif/make-room-loading.gif" width={24} height={24} alt="Loading" />
              </div>
            ) : (
              <svg
                className={`m-auto transition ${disableButton ? 'fill-slate-400' : 'fill-white'}`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <path d="M1.724 1.053a.5.5 0 0 0-.714.545l1.403 4.85a.5.5 0 0 0 .397.354l5.69.953c.268.053.268.437 0 .49l-5.69.953a.5.5 0 0 0-.397.354l-1.403 4.85a.5.5 0 0 0 .714.545l13-6.5a.5.5 0 0 0 0-.894l-13-6.5Z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default DialogChat;
