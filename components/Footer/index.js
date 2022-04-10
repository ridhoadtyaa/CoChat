import { FaInstagram } from 'react-icons/fa';
import { FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="sm:container sm:mx-auto">
      <div className="bg-white rounded-t-lg p-10 md:flex lg:p-16">
        <div className="md:w-4/12">
          <h2 className="font-medium text-lg">👋 CoChat</h2>
          <p className="opacity-60 mt-6">
            Sebenernya banyak banget aplikasi chatting yang lebih bagus dari
            ini, maka dari itu lebih baik pake yang lain aja deh ya daripada
            pake aplikasi yang ini.
          </p>
          <div className="opacity-60 font-semibold text-sm mt-6">
            Redesign by CoChat | Designed by Nauval
          </div>
        </div>
        <div className="mt-10 md:w-4/12 md:mt-0 md:flex md:flex-col md:items-center">
          <h2 className="text-lg font-medium">Sitemap</h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a href="#" className="font-semibold opacity-60">
                Beranda
              </a>
            </li>
            <li>
              <a href="#fitur" className="font-semibold opacity-60">
                Fitur-fitur
              </a>
            </li>
            <li>
              <a href="#teknologi" className="font-semibold opacity-60">
                Teknologi
              </a>
            </li>
            <li>
              <a href="#faq" className="font-semibold opacity-60">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10 md:w-4/12 md:mt-0">
          <h2 className="text-lg font-medium">Tetap Terhubung</h2>
          <p className="opacity-60 mt-6">
            Lihat kami pansos di sosial media berikut:
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="http://instagram.com/cochat"
              className="rounded-md bg-slate-300/60 hover:bg-slate-300 transition duration-300 p-2"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="http://facebook.com/cochat"
              className="rounded-md bg-slate-300/60 hover:bg-slate-300 transition duration-300 p-2"
            >
              <FiFacebook className="text-2xl" />
            </a>
            <a
              href="http://twitter.com/cochat"
              className="rounded-md bg-slate-300/60 hover:bg-slate-300 transition duration-300 p-2"
            >
              <FiTwitter className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
