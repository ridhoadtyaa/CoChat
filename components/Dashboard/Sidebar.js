import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'js-cookie';
import CustomModal from '@/components/Modal';

import { RiDashboardFill, RiShutDownLine } from 'react-icons/ri';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { BiKey } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';

const sidebarMenu = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <RiDashboardFill size={25} />,
  },
  {
    title: 'Daftar room chat',
    href: '/dashboard/daftar-room',
    icon: <IoChatbubblesSharp size={25} />,
  },
  {
    title: 'Daftar akun admin',
    href: '/dashboard/daftar-admin',
    icon: <BsFillPeopleFill size={25} />,
  },
  {
    title: 'Ubah password akun',
    href: '/dashboard/ubah-password',
    icon: <BiKey size={25} />,
  },
];

const SidebarDashboard = () => {
  const router = useRouter();

  const [modalLogout, setModalLogout] = useState(false);

  const logoutHandler = () => {
    Cookies.remove('username');
    Cookies.remove('token', { path: '' });
    router.replace('/admin');
  };

  return (
    <>
      <aside className="sticky top-0 flex h-screen w-16 flex-col items-center justify-between border-r border-slate-200 bg-white p-6">
        <div className="-translate-x-1 text-3xl">👋</div>

        <div className="flex flex-col items-center space-y-8 rounded-md bg-primary px-2 py-6">
          {sidebarMenu.map((menu) => {
            return (
              <Link key={menu.title} href={menu.href} passHref>
                <button
                  title={menu.title}
                  className={`${
                    router.asPath === menu.href ? 'text-slate-400' : 'text-white'
                  } transition-all duration-300 hover:text-opacity-70`}
                >
                  {menu.icon}
                </button>
              </Link>
            );
          })}
        </div>

        <button onClick={() => setModalLogout(true)}>
          <RiShutDownLine className="text-primary transition duration-300 hover:text-opacity-70" size={25} />
        </button>
      </aside>

      <CustomModal isOpen={modalLogout} closeModal={() => setModalLogout(false)}>
        <h4 className="text-center font-semibold">Yakin ingin Logout ?</h4>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            onClick={logoutHandler}
            className="rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600"
          >
            Ya
          </button>
          <button
            onClick={() => setModalLogout(false)}
            className="rounded-md bg-slate-200/80 py-2 px-6 text-sm text-blue-500 transition duration-300 hover:bg-slate-200"
          >
            Batalkan
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default SidebarDashboard;
