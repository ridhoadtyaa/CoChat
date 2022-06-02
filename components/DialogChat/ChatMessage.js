import Image from 'next/image';

const Chat = ({ text, nameUser, pictureUser, date, self }) => {
  return (
    <div className={`w-fit max-w-xs sm:max-w-lg lg:max-w-2xl ${self && 'ml-auto'}`}>
      <div className={`rounded-xl p-4 ${self ? 'rounded-tr-none bg-primary' : 'rounded-tl-none bg-slate-100'}`}>
        <div className={`${self && 'text-white selection:bg-white selection:text-primary'}`}>{text}</div>
        <div className="mt-6 flex items-center">
          <Image className="rounded-full" src={pictureUser} height={24} width={24} alt={nameUser} />
          <div
            className={`text-md ml-4 ${
              self ? 'text-white selection:bg-white selection:text-primary' : 'text-slate-500'
            }`}
          >
            {nameUser}
          </div>
        </div>
      </div>
      <div className={`mt-2 flex items-center justify-start space-x-2`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-sm text-black/60">{date}</div>
      </div>
    </div>
  );
};

export default Chat;
