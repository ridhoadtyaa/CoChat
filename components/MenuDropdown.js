import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const MenuDropdown = ({
  button,
  position = 'top-12 right-0',
  children,
  widthMenu,
}) => {
  return (
    <Menu>
      <Menu.Button>{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute ${widthMenu} ${position} origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
