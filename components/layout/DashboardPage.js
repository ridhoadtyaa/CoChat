import Head from 'next/head';
import SidebarDashboard from '../Dashboard/Sidebar';
import NavbarDashboard from '../Dashboard/Navbar';

const DashboardPage = ({ title = 'Dashboard', children }) => {
  return (
    <>
      <Head>
        <title>{title} - CoChat</title>
      </Head>
      <div className="flex bg-white">
        <SidebarDashboard />

        <div className="w-full">
          <NavbarDashboard />

          <main className="flex h-full flex-col px-10 pt-28 pb-5">
            <h3 className="text-xl font-semibold">{title}</h3>

            <div className="mt-8 grow">{children}</div>
            <div className="mt-10 text-slate-500">Copyright &copy; 2022 CoChat</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
