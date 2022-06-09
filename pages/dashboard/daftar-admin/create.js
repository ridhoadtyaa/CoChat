import FormInput from '@/components/FormInput';
import DashboardPage from '@/components/layout/DashboardPage';
import { db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateAdmin = () => {
  const [fields, setFields] = useState({
    username: '',
    name: '',
    no_telp: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const changeHander = (e) => {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const addAdminHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(fields.password, salt);

    try {
      await setDoc(doc(db, 'admin-account', fields.username), {
        id: Date.now(),
        ...fields,
        password: hash,
      });

      toast.success('Data berhasil ditambahkan');
      setFields({
        username: '',
        name: '',
        no_telp: '',
        password: '',
      });
    } catch (error) {
      console.log('🚀 ~ file: create.js ~ line 30 ~ addAdminHandler ~ error', error);
    }
    setIsLoading(false);
  };

  return (
    <DashboardPage title="Tambah Akun Admin">
      <form onSubmit={addAdminHandler}>
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="w-full">
            <FormInput label="Username" type="text" name="username" value={fields.username} onChange={changeHander} />
          </div>
          <div className="w-full">
            <FormInput label="Nama" type="text" name="name" value={fields.name} onChange={changeHander} />
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="w-full">
            <FormInput label="No. Telp" type="number" name="no_telp" value={fields.no_telp} onChange={changeHander} />
          </div>
          <div className="w-full">
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={fields.password}
              onChange={changeHander}
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`mt-6 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-blue-600 ${
            isLoading && 'bg-slate-400'
          }`}
        >
          Tambah
        </button>
      </form>
    </DashboardPage>
  );
};

export default CreateAdmin;
