import DashboardPage from '@/components/layout/DashboardPage';
import Table from '@/components/Table';
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

const DaftarRoom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allDocs = [];
    onSnapshot(collection(db, 'room-chat'), (snapshot) => {
      allDocs = [];
      snapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
      setData(allDocs);
    });
  }, []);

  return (
    <DashboardPage title="Daftar room">
      <Table
        columns={[
          {
            name: 'Room Name',
            label: 'room_name',
          },
          {
            name: 'Room Code',
            label: 'room_code',
          },
          {
            name: 'Room Status',
            label: 'room_state',
          },
        ]}
        data={data}
        searchBy={['room_name', 'room_code']}
      />
    </DashboardPage>
  );
};

export default DaftarRoom;
