import DashboardPage from '@/components/layout/DashboardPage';
import { BsChatLeftDots } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import CountUp from 'react-countup';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

export const getServerSideProps = async () => {
  const room = [];
  const admin = [];

  const roomSnapshot = await getDocs(collection(db, 'room-chat'));
  roomSnapshot.forEach((doc) => room.push(doc.data()));

  const adminSnapshot = await getDocs(collection(db, 'admin-account'));
  adminSnapshot.forEach((doc) => admin.push(doc.data()));

  return {
    props: {
      sumRoom: room.length,
      sumAdmin: admin.length,
    },
  };
};

const Dashboard = ({ sumRoom, sumAdmin }) => {
  return (
    <DashboardPage title="Dashboard">
      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <div className="w-full space-y-3 rounded-md p-4 shadow-xl md:space-y-6 md:p-6">
          <BsChatLeftDots size={30} className="text-primary" />
          <div className="text-3xl font-semibold">
            <CountUp end={sumRoom} duration={1} />
          </div>
          <div className="font-semibold">Jumlah Room Chat</div>
        </div>
        <div className="w-full space-y-3 rounded-md p-4 shadow-xl md:space-y-6 md:p-6">
          <RiAdminLine size={30} className="text-primary" />
          <div className="text-3xl font-semibold">
            <CountUp end={sumAdmin} duration={1} />
          </div>
          <div className="font-semibold">Jumlah Admin</div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default Dashboard;
