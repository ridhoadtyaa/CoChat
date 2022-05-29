import { useState } from 'react';
import ChatMessage from './ChatMessage';
import chatRoomStyles from '../../styles/chat-room';

const DialogChat = () => {
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const changeHandler = (e) => {
    setMessage(e.target.value);
    message.length > 1 ? setDisableButton(false) : setDisableButton(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    alert('ok');
  };

  return (
    <>
      <section className="h-screen">
        <main className="px-4 space-y-10 pt-24 pb-10 overflow-y-scroll h-[90vh]">
          <ChatMessage
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
          />
        </main>
        <style jsx>{chatRoomStyles}</style>
      </section>

      <form onSubmit={sendMessage}>
        <div className="fixed bottom-0 p-2 w-full bg-white max-w-7xl flex items-center border-slate-100 border-y-2">
          <input
            type="text"
            placeholder="Type a message"
            className="block w-full h-full border-slate-200 px-8 text-lg outline-none placeholder:text-slate-500"
            value={message}
            onChange={changeHandler}
          />
          <button
            className={`w-16 h-14 flex transition ${
              disableButton ? 'bg-blue-800 cursor-not-allowed' : 'bg-primary'
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
