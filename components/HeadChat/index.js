import Image from 'next/image';
import MenuChat from './MenuChat';

const HeadChat = ({ image, nameRoom }) => {
  return (
    <header className="itemx-center flex justify-between bg-slate-100 px-8 py-3 absolute z-10 w-full top-0">
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
