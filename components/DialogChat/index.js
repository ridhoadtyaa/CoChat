import chatRoomStyles from '@/styles/chat-room';
import { auth, db } from '@/services/firebase';
import ChatMessage from './ChatMessage';
import { Timestamp, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

const DialogChat = ({ code }) => {
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [data, setData] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const bottomChat = useRef();
  const chatList = useRef();

  const goToBottom = () => {
    chatList.current.scrollTop = chatList.current.scrollHeight;
  };

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
            id: Date.now() + uid,
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
      bottomChat.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onScroll = ({ target }) => {
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      setData(doc.data());
    });
  }, [code]);

  useEffect(() => {
    setIsOnBottom(false);
  }, []);

  return (
    <>
      <section className="relative">
        <main className="h-screen space-y-10 overflow-y-scroll px-4 py-24" onScroll={onScroll} ref={chatList}>
          {data.chats ? (
            data.chats.map((chat) => (
              <ChatMessage
                text={chat.text}
                nameUser={chat.displayName}
                pictureUser={chat.photoURL}
                date={
                  chat.createdAt.toDate().toDateString() +
                  ' ' +
                  chat.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
                key={chat.id}
                self={chat.uid === auth.currentUser.uid}
              />
            ))
          ) : (
            <div className="flex justify-center pt-24">
              <Image src="/gif/circle-loading.gif" width={40} height={40} alt="Loading" />
            </div>
          )}
          <span ref={bottomChat}></span>
        </main>
        <style jsx>{chatRoomStyles}</style>
        {!isOnBottom && (
          <button
            onClick={goToBottom}
            title="Scroll to bottom"
            className={`absolute bottom-24 right-3 flex h-8 w-8 max-w-7xl rounded-full bg-blue-400 text-white shadow transition-all`}
          >
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className='m-auto w-5' preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="white" d="M11.74 7.7a.75.75 0 1 1 1.02 1.1l-4.25 4a.75.75 0 0 1-1.02 0l-4.25-4a.75.75 0 1 1 1.02-1.1L8 11.226L11.74 7.7Zm0-4a.75.75 0 1 1 1.02 1.1l-4.25 4a.75.75 0 0 1-1.02 0l-4.25-4a.75.75 0 1 1 1.02-1.1L8 7.227L11.74 3.7Z"/></svg>
          </button>
        )}
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
                <Image src="/gif/circle-loading.gif" width={24} height={24} alt="Loading" />
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
