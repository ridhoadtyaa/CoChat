import { useState } from 'react';
let navItemsState = {
  
  links: [
    {
      id: 1,
      name: 'Beranda',
      href: '#',
    },
    {
      id: 2,
      name: 'Fitur-fitur',
      href: '#fitur',
    },
    {
      id: 3,
      name: 'Teknologi',
      href: '#teknologi',
    },
    {
      id: 4,
      name: 'FAQ',
      href: '#faq',
    },
  ],
};

const NavItem = ({ item, children, href, onClick, className }) => {
  return (
    <li className={className} onClick={onClick}>
      <a href={href}>{children}</a>
    </li>
  );
};

const Navbar = () => {
  const [offCanvas, setOffCanvas] = useState(false);
  const [activeId, setActiveId] = useState(1);
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between py-8">
        <div className="text-2xl font-bold">
          <a href="#">👋 CoChat</a>
        </div>
        <button onClick={() => setOffCanvas(!offCanvas)} className="md:hidden">
          {/* prettier-ignore */}
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
						<path fill="currentColor" d="M21 18H9v-2h12v2Zm0-5H3v-2h18v2Zm0-5H9V6h12v2Z"/>
					</svg>
        </button>
        <div
          className={`fixed top-0 ${
            offCanvas ? 'left-0' : '-left-full'
          } n z-50 h-full w-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300  md:static md:w-auto md:bg-none`}
        >
          <div className="flex flex-row-reverse items-start justify-between px-4 pt-8 md:px-0 md:pt-0">
            <button className="md:hidden" onClick={() => setOffCanvas(false)}>
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
            </button>

            <ul className="flex flex-col space-y-6 md:mt-0 md:flex-row md:space-y-0 md:space-x-10">
              {navItemsState.links.map((item) => {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveId(item.id);
                      setOffCanvas(false);
                    }}
                    className={`text-lg text-white transition duration-300 hover:text-blue-200 md:text-black md:hover:text-blue-500 ${
                      activeId === item.id ? 'font-semibold' : ''
                    }`}
                  >
                    {item.name}
                  </NavItem>
                );
              })}
              {/* <NavItem
                href="#"
                onClick={() => {
                  setOffCanvas(false);
                  setActiveNav(true);
                }}
                className={`${activeNav === true ? 'font-semibold' : ''}`}
              >
                Beranda
              </NavItem>
              <NavItem
                href="#fitur"
                className={`${activeNav === 'fitur' ? 'font-semibold' : ''}`}
                onClick={() => {
                  setOffCanvas(false);
                  setActiveNav('fitur');
                  console.group(activeNav);
                }}
              >
                Fitur-fitur
              </NavItem>
              <NavItem href="#teknologi" onClick={() => setOffCanvas(false)}>
                Teknologi
              </NavItem>
              <NavItem href="#faq" onClick={() => setOffCanvas(false)}>
                FAQ
              </NavItem> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
