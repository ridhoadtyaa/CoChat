import ChatMessage from './ChatMessage';
import chatRoomStyles from '../../styles/chat-room';

const DialogChat = () => {
  return (
    <>
      <section className="h-screen">
        <main className="px-4 space-y-10 pt-24 pb-8 overflow-y-scroll h-[90vh]">
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

      <div className="px-4 py-4 absolute bottom-0 w-full bg-white">
        <input
          type="text"
          placeholder="Type a message"
          className="block w-full h-full rounded-full border-2 border-slate-200 py-4 px-8 outline-none placeholder:text-sm placeholder:text-slate-500 caret-text-primary"
        />
      </div>
    </>
  );
};

export default DialogChat;
