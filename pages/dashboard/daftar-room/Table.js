import { db } from '@/services/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Table = () => {
  const router = useRouter();
  const { page } = router.query;
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
    <>
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr>
            <th className="border bg-blue-200 px-8 py-4 text-left">Room Name</th>
            <th className="border bg-blue-200 px-8 py-4 text-left">Room Code</th>
            <th className="border bg-blue-200 px-8 py-4 text-left">Room Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, i) => (
              <tr key={i}>
                <td className="border px-8 py-4">{item.room_name}</td>
                <td className="border px-8 py-4">{item.room_code}</td>
                <td className="border px-8 py-4">{item.room_state}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-8 py-4">
                <Image src="/gif/circle-loading.gif" width={30} height={30} alt="Loading" />
              </td>
              <td className="border px-8 py-4">
                <Image src="/gif/circle-loading.gif" width={30} height={30} alt="Loading" />
              </td>
              <td className="border px-8 py-4">
                <Image src="/gif/circle-loading.gif" width={30} height={30} alt="Loading" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
