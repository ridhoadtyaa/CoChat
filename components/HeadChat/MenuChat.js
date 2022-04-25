import { Menu, Transition } from '@headlessui/react';
import Router from 'next/router';
import { Fragment } from 'react';

const menuList = [
  ['Ubah Nama Ruangan', 'Ubah Foto Ruangan'],
  ['Daftar Anggota', 'Bagikan Info'],
  ['Bubarkan Ruangan', 'Keluar'],
];

const MenuChat = () => {
  const exitHandler = () => {
    Router.replace('/');
  };

  return (
    <Menu as="div" className="relative flex self-center">
      <div>
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="w-6"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 40 40"
          >
            <g fill="currentColor">
              <path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002z" />
              <circle cx={20} cy="19.999" r="3.112" />
              <circle cx={20} cy="30.685" r="3.112" />
            </g>
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-2 w-56 top-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuList.map((item, index) => (
            <div className="px-1 py-1" key={index}>
              {item.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={exitHandler}
                      className={`${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {item}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuChat;