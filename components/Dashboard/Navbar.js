import { IoSearchOutline } from 'react-icons/io5';

const NavbarDashboard = () => {
  return (
    <nav className="fixed top-0 z-10 flex h-fit w-full items-center justify-between border-b border-slate-200 bg-white px-10 py-4 pr-24">
      <h3 className="text-lg font-semibold">Hi, Admin!</h3>

      <div className="relative">
        <input
          type="text"
          placeholder="Cari disini"
          className="hidden w-52 rounded-md border-2 border-slate-100 p-2 outline-none placeholder:font-semibold focus:ring focus:ring-primary sm:block"
        />
        <IoSearchOutline className="top-2 right-4 text-slate-400 sm:absolute" size={25} />
      </div>
    </nav>
  );
};

export default NavbarDashboard;
