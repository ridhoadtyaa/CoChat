import DashboardPage from '@/components/layout/DashboardPage';
import Table from '@/components/Table';
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import ButtonIcon from '@/components/ButtonIcon';
import Link from 'next/link';

const DaftarAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allDocs = [];
    onSnapshot(collection(db, 'admin-account'), (snapshot) => {
      allDocs = [];
      snapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
      setData(allDocs);
    });
  }, []);

  return (
    <DashboardPage title="Daftar Admin">
      <Table
        columns={[
          {
            name: 'Nama',
            label: 'name',
          },
          {
            name: 'Username',
            label: 'username',
          },
          {
            name: 'No. Telp',
            label: 'no_telp',
          },
        ]}
        data={data}
        searchBy={['name', 'username']}
        acrossSearch={
          <Link href="/dashboard/daftar-admin/create" passHref>
            <button className="rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-blue-600">
              Tambah Data
            </button>
          </Link>
        }
      />
    </DashboardPage>
  );
};

export default DaftarAdmin;
