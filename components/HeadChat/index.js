import Image from 'next/image';
import MenuChat from './MenuChat';

const HeadChat = ({ image, nameRoom }) => {
  return (
    <header className="items-center flex justify-between bg-slate-100 px-8 py-3 z-10 fixed w-full max-w-7xl top-0">
      <div className="flex items-center space-x-4">
        <div>
          <Image
            className="rounded-full"
            src={image}
            alt={nameRoom}
            height={40}
            width={40}
          />
        </div>
        <div className="self-center font-semibold">{nameRoom}</div>
      </div>
      <MenuChat />
    </header>
  );
};

export default HeadChat;
