import Link from 'next/link';
import { useRouter } from 'next/router';

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
    title: 'Ganti password akun',
    href: '/dashboard/ganti-password',
    icon: <BiKey size={25} />,
  },
];

const SidebarDashboard = () => {
  const router = useRouter();

  return (
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

      <button>
        <RiShutDownLine className="text-primary transition duration-300 hover:text-opacity-70" size={25} />
      </button>
    </aside>
  );
};

export default SidebarDashboard;
