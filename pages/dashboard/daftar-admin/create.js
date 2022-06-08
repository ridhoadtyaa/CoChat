import FormInput from '@/components/FormInput';
import DashboardPage from '@/components/layout/DashboardPage';

const CreateAdmin = () => {
  return (
    <DashboardPage title="Tambah Akun Admin">
      <form>
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="w-full">
            <FormInput label="Username" type="text" name="username" />
          </div>
          <div className="w-full">
            <FormInput label="Nama" type="text" name="nama" />
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="w-full">
            <FormInput label="No. Telp" type="number" name="no_telp" />
          </div>
          <div className="w-full">
            <FormInput label="Password" type="password" name="password" />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-blue-600"
        >
          Tambah
        </button>
      </form>
    </DashboardPage>
  );
};

export default CreateAdmin;
