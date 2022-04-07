import Image from 'next/image';

const ButtonIcon = ({ children, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-[48%] items-center justify-center space-x-2 rounded-full border-2 border-blue-500/60 py-2 px-6 font-bold"
  >
    <Image src={icon} alt={children} width="20" height="20" />
    <span>{children}</span>
  </button>
);

export default ButtonIcon;
