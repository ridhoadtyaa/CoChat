import FormInput from '@/components/FormInput';
import DashboardPage from '@/components/layout/DashboardPage';
import { useState } from 'react';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const username = Cookies.get('username');

  const [fields, setFields] = useState({
    oldPassword: '',
    newPassword: '',
    confPassword: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    const user = await getDoc(doc(db, 'admin-account', username));
    const { password } = user.data();

    bcrypt.compare(fields.oldPassword, password, async (err, res) => {
      if (!res) {
        toast.error('Password lama tidak valid!');
      } else {
        if (fields.newPassword !== fields.confPassword) {
          toast.error('Password baru dan konfirmasi password baru tidak sama!');
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(fields.newPassword, salt);

          try {
            await updateDoc(doc(db, 'admin-account', username), {
              password: hash,
            });

            toast.success('Password berhasil diubah!');
            setFields({
              oldPassword: '',
              newPassword: '',
              confPassword: '',
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  return (
    <DashboardPage title="Ubah Password Akun">
      <form onSubmit={changePasswordHandler}>
        <div>
          <FormInput
            label="Password Lama"
            type="password"
            name="oldPassword"
            value={fields.oldPassword}
            onChange={changeHandler}
          />
        </div>
        <div className="mt-6">
          <FormInput
            label="Password Baru"
            type="password"
            name="newPassword"
            value={fields.newPassword}
            onChange={changeHandler}
          />
        </div>
        <div className="mt-6">
          <FormInput
            label="Konfirmasi Password Baru"
            type="password"
            name="confPassword"
            value={fields.confPassword}
            onChange={changeHandler}
          />
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-blue-600"
        >
          Ubah Password
        </button>
      </form>
    </DashboardPage>
  );
};

export default ChangePassword;
