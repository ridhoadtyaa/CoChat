import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import Router from 'next/router';
import MenuDropdown from '../MenuDropdown';
import CustomModal from '../Modal';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '@/services/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useUser } from '@/context/user';
import modalAnggota from '@/styles/modal-anggota';

const menuList = [
  [
    {
      label: 'Ubah Nama Ruangan',
      isMaster: true,
    },
    {
      label: 'Ubah Foto Ruangan',
      isMaster: true,
    },
  ],
  [
    {
      label: 'Daftar Anggota',
      isMaster: false,
    },
    {
      label: 'Bagikan Info',
      isMaster: false,
    },
  ],
  [
    {
      label: 'Bubarkan Ruangan',
      isMaster: true,
    },
    {
      label: 'Keluar',
      isMaster: false,
    },
  ],
];

const MenuChat = ({ code }) => {
  const user = useUser();
  const [data, setData] = useState({});
  const [namaRuangan, setNamaRuangan] = useState('');
  const [searchAnggota, setSearchAnggota] = useState('');

  const [imageAsFile, setImageAsFile] = useState('');
  const [percentUpload, setPercentUpload] = useState('');

  const menuNotMaster = menuList.map((menu) => menu.filter((item) => !item.isMaster)).slice(1);

  const listAnggota = [];
  data.chats
    ? [...new Set(data.chats.map((anggota) => `${anggota.displayName}⌛${anggota.uid}⌛${anggota.photoURL}`))]
        .map((anggota) => {
          return { name: anggota.split('⌛')[0], uid: anggota.split('⌛')[1], photoURL: anggota.split('⌛')[2] };
        })
        .forEach((e) => (e.uid === data.room_master.trim() ? listAnggota.unshift(e) : listAnggota.push(e)))
    : null;

  const [modalUbahNama, setModalUbahNama] = useState(false);
  const [modalUbahFoto, setModalUbahFoto] = useState(false);
  const [modalDaftarAnggota, setModalDaftarAnggota] = useState(false);
  const [modalBagikanInfo, setModalBagikanInfo] = useState(false);
  const [modalBubarkan, setModaBubarkan] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, 'room-chat', code), (doc) => {
      setData(doc.data());
      setNamaRuangan(doc.data().room_name);
      if (doc.data().room_master != user.uid && doc.data().room_state === 'inactive') {
        toast.success('Ruangan telah di nonaktifkan oleh pemilik ruangan');
        Router.push('/');
      }
    });
  }, [code, user]);

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

  const ubahFotoHandlerAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const ubahFotoHandler = async (e) => {
    e.preventDefault();

    if (imageAsFile.type.split('/')[0] != 'image') {
      toast.error('Yang anda pilih bukan gambar!');
    } else {
      const storageRef = ref(storage, 'room_pictures/' + uuidv4().toString());
      const uploadTask = uploadBytesResumable(storageRef, imageAsFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentUpload(`${Math.round(progress)}%`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(storageRef).then((url) => {
            // Delete image on firestorage before if already set
            if (data.room_picture && data.room_picture != '') {
              const regex = /room_pictures%2F(.*?)\?/gm;
              const roomPictureBefore = regex.exec(data.room_picture)[1];
              const desertRef = ref(storage, 'room_pictures/' + roomPictureBefore);
              deleteObject(desertRef);
            }
            updateDoc(doc(db, 'room-chat', code), {
              room_picture: url,
            });
            toast.success('Foto ruangan berhasil diubah');
            setPercentUpload('');
            setModalUbahFoto(false);
          });
        }
      );
    }
  };

  const salinInfoHandler = () => {
    const customText = `Hey, kamu diundang ke room ${data.room_name}\nhttps://co-chat.vercel.app/${data.room_code}\nAyo berchat ria di CoChat!`;

    navigator.clipboard.writeText(customText);
    toast.success('Info ruangan berhasil disalin');
    setModalBagikanInfo(false);
  };

  const bubarkanHandler = async () => {
    updateDoc(doc(db, 'room-chat', code), {
      room_state: 'inactive',
    }).then(() => {
      toast.success('Ruangan berhasil dibubarkan');
      setModaBubarkan(false);
      Router.push('/');
    });
  };

  const clickMenuHandler = (menu) => {
    switch (menu) {
      case 'Ubah Nama Ruangan':
        setModalUbahNama((prev) => !prev);
        break;
      case 'Ubah Foto Ruangan':
        setModalUbahFoto((prev) => !prev);
        break;
      case 'Daftar Anggota':
        setModalDaftarAnggota((prev) => !prev);
        break;
      case 'Bagikan Info':
        setModalBagikanInfo((prev) => !prev);
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
        {user.uid === data.room_master
          ? menuList.map((item, index) => (
              <div className="px-1 py-1" key={index}>
                {item.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => clickMenuHandler(item.label)}
                        className={`${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            ))
          : menuNotMaster.map((item, index) => (
              <div className="px-1 py-1" key={index}>
                {item.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => clickMenuHandler(item.label)}
                        className={`${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item.label}
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
      <CustomModal
        closeModal={() => {
          setModalUbahFoto(false);
          setPercentUpload('');
        }}
        isOpen={modalUbahFoto}
      >
        <div className="overflow-hidden text-center">
          <Image
            src={data.room_picture}
            width={120}
            height={120}
            className="rounded-full object-cover"
            alt="Room Photo Profile"
          />
        </div>
        <form onSubmit={ubahFotoHandler}>
          <div className="relative mx-auto mt-4 w-fit rounded-full border-2 border-blue-500 py-2 px-8">
            <span className="text-sm font-semibold">Upload Foto Ruangan</span>
            <input type="file" onChange={ubahFotoHandlerAsFile} className="absolute inset-0 opacity-0" />
          </div>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <button
              type="submit"
              className={`rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600 ${
                percentUpload && 'cursor-not-allowed bg-slate-400 hover:bg-slate-400'
              }`}
              disabled={percentUpload ? true : false}
            >
              {percentUpload ? percentUpload : 'Ubah'}
            </button>
            <button
              type="button"
              onClick={() => setModalUbahFoto(false)}
              className="rounded-md bg-slate-200/80 py-2 px-6 text-sm text-blue-500 transition duration-300 hover:bg-slate-200"
            >
              Batalkan
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Modal daftar anggota */}
      <CustomModal closeModal={() => setModalDaftarAnggota(false)} isOpen={modalDaftarAnggota}>
        <div className="relative">
          <input
            type="text"
            className="w-full border-b-2 border-slate-300 bg-slate-200 py-1 px-4 outline-none focus:border-primary"
            placeholder="Cari anggota"
            value={searchAnggota}
            onChange={(e) => setSearchAnggota(e.target.value)}
          />
          {/* prettier-ignore */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2 stroke-slate-400" fill='none' viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {listAnggota ? (
          <div className="modal_anggota mt-5 max-h-56 space-y-5 overflow-y-auto">
            {listAnggota
              .filter((anggota) => {
                if (searchAnggota === '') {
                  return anggota;
                } else if (anggota.name.toLowerCase().includes(searchAnggota.toLocaleLowerCase())) {
                  return anggota;
                }
              })
              .map((anggota) => (
                <div className="flex items-center space-x-4" key={anggota.uid}>
                  <Image src={anggota.photoURL} width={25} height={25} alt="Orang" className="rounded-full" />
                  <div>
                    {anggota.name} {anggota.uid.trim() === data.room_master.trim() && '👑'}
                  </div>
                </div>
              ))}
            <style jsx>{modalAnggota}</style>
          </div>
        ) : (
          <div className="mt-5 text-center text-sm text-slate-500">
            Belum ada anggota.
            <br />
            Chat di room ini jika ingin menjadi anggota pertama.
          </div>
        )}
      </CustomModal>

      {/* Modal bagikan info */}
      <CustomModal closeModal={() => setModalBagikanInfo(false)} isOpen={modalBagikanInfo}>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-fit rounded-full bg-slate-200 py-2 px-6 text-center">{data.room_code}</div>
          <button
            onClick={salinInfoHandler}
            className="flex w-fit items-center rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600"
          >
            Salin Info
          </button>
        </div>
      </CustomModal>

      {/* Modal bubarkan ruangan */}
      <CustomModal closeModal={() => setModaBubarkan(false)} isOpen={modalBubarkan}>
        <h3 className="text-center text-lg font-semibold">Bubarkan Ruangan</h3>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            onClick={bubarkanHandler}
            className="rounded-md bg-blue-500 py-2 px-6 text-sm text-white transition duration-300 hover:bg-blue-600"
          >
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
