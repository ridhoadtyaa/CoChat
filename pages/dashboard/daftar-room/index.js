import DashboardPage from '@/components/layout/DashboardPage';

const index = () => {
  return (
    <DashboardPage title="Daftar room">
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr>
            <th className="border bg-blue-200 px-8 py-4 text-left">Company</th>
            <th className="border bg-blue-200 px-8 py-4 text-left">Contact</th>
            <th className="border bg-blue-200 px-8 py-4 text-left">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-8 py-4">Alfreds Futterkiste</td>
            <td className="border px-8 py-4">Dante Sparks</td>
            <td className="border px-8 py-4">Italy</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">Centro comercial Moctezuma</td>
            <td className="border px-8 py-4">Neal Garrison</td>
            <td className="border px-8 py-4">Spain</td>
          </tr>
        </tbody>
        <tr></tr>
      </table>
    </DashboardPage>
  );
};

export default index;
