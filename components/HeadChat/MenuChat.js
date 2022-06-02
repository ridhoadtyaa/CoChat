import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import Router from 'next/router';
import MenuDropdown from '../MenuDropdown';
import CustomModal from '../Modal';
import Image from 'next/image';
import { db } from '@/services/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const menuList = [
  ['Ubah Nama Ruangan', 'Ubah Foto Ruangan'],
  ['Daftar Anggota', 'Bagikan Info'],
  ['Bubarkan Ruangan', 'Keluar'],
];

const MenuChat = ({ code }) => {
  const [data, setData] = useState({});

  const [modalUbahNama, setModalUbahNama] = useState(false);
  const [namaRuangan, setNamaRuangan] = useState('');

  const [modalUbahFoto, setModalUbahFoto] = useState(false);
  const [modalBubarkan, setModaBubarkan] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      setData(doc.data());
      setNamaRuangan(doc.data().room_name);
    });
  }, [code]);

  const ubahNamaHandler = async (e) => {
    e.preventDefault();
    if (namaRuangan.length > 0) {
      await updateDoc(doc(db, 'room-chat', code), {
        room_name: namaRuangan,
      });
      setModalUbahNama(false);
      toast.success('Nama ruangan berhasil diubah');
    } else {
      toast.error('Field harus diisi!');
    }
  };

  const clickMenuHandler = (menu) => {
    switch (menu) {
      case 'Ubah Nama Ruangan':
        setModalUbahNama((prev) => !prev);
        break;
      case 'Ubah Foto Ruangan':
        setModalUbahFoto((prev) => !prev);
        break;
      case 'Bubarkan Ruangan':
        setModaBubarkan((prev) => !prev);
        break;
      case 'Keluar':
        Router.replace('/');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MenuDropdown
        position="top-16 right-10"
        button={
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
        }
        widthMenu="w-56"
      >
        {menuList.map((item, index) => (
          <div className="px-1 py-1" key={index}>
            {item.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => clickMenuHandler(item)}
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        ))}
      </MenuDropdown>

      {/* Modal */}

      {/* Modal Ubah Nama Ruangan */}
      <CustomModal
        closeModal={() => {
          setModalUbahNama(false);
          setTimeout(() => {
            setNamaRuangan(data.room_name);
          }, 200);
        }}
        isOpen={modalUbahNama}
        title="Ubah Nama Ruangan"
      >
        <form onSubmit={ubahNamaHandler}>
          <input
            type="text"
            onChange={(e) => setNamaRuangan(e.target.value)}
            value={namaRuangan}
            className="blok block w-full border-b-2 border-blue-500 py-2 px-4 text-center outline-0"
            placeholder="Nama Ruangan"
          />

          <div className="mt-4 flex items-center justify-end space-x-4">
            <button
              type="submit"
              className="rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600"
            >
              Ubah
            </button>
            <button
              type="button"
              onClick={() => {
                setModalUbahNama(false);
                setTimeout(() => {
                  setNamaRuangan(data.room_name);
                }, 200);
              }}
              className="rounded-md bg-slate-200/80 py-2 px-6 text-sm text-blue-500 transition duration-300 hover:bg-slate-200"
            >
              Batalkan
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Modal Ubah Foto Ruangan */}
      <CustomModal closeModal={() => setModalUbahFoto(false)} isOpen={modalUbahFoto}>
        <div className="overflow-hidden text-center">
          <Image src="/img/taubat.jpg" width={120} height={120} className="rounded-full" alt="Room Photo Profile" />
        </div>

        <div className="relative mx-auto mt-4 w-fit rounded-full border-2 border-blue-500 py-2 px-8">
          <span className="text-sm font-semibold">Upload Foto Ruangan</span>
          <input type="file" className="absolute inset-0 opacity-0" />
        </div>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <button className="rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600">
            Ubah
          </button>
          <button
            onClick={() => setModalUbahFoto(false)}
            className="rounded-md bg-slate-200/80 py-2 px-6 text-sm text-blue-500 transition duration-300 hover:bg-slate-200"
          >
            Batalkan
          </button>
        </div>
      </CustomModal>

      <CustomModal closeModal={() => setModaBubarkan(false)} isOpen={modalBubarkan}>
        <h3 className="text-center text-lg font-semibold">Bubarkan Ruangan</h3>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button className="rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600">
            Konfirmasi
          </button>
          <button
            onClick={() => setModaBubarkan(false)}
            className="rounded-md bg-slate-200/80 py-2 px-6 text-sm text-blue-500 transition duration-300 hover:bg-slate-200"
          >
            Batalkan
          </button>
        </div>
      </CustomModal>

      {/* End of Modal */}
    </>
  );
};

export default MenuChat;
