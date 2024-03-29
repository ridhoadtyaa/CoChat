import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import bcrypt from 'bcryptjs';
import Head from 'next/head';
import * as jose from 'jose';
import { toast } from 'react-toastify';
import FormInput from '@/components/FormInput';

const secret = process.env.NEXT_PUBLIC_SECRET_JWT;

export const getServerSideProps = async ({ req }) => {
  const token = req.cookies['token'];

  if (token) {
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(secret));

      return {
        redirect: {
          permanent: false,
          destination: '/dashboard',
        },
      };
    } catch {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
  }

  return { props: {} };
};

const Admin = () => {
  const routes = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const adminRef = doc(db, 'admin-account', fields.username);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      bcrypt.compare(fields.password, adminSnap.data().password, async (err, res) => {
        if (res) {
          const jwtToken = await new jose.SignJWT({ username: fields.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .sign(new TextEncoder().encode(secret));

          Cookies.set('token', jwtToken, { path: '/' });
          Cookies.set('username', fields.username);
          routes.push('/dashboard');
        } else {
          toast.error('Username / password salah!');
        }
      });
    } else {
      toast.error('Username / password salah!');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login Admin - CoChat</title>
      </Head>

      <div className="flex min-h-screen bg-white">
        <section className="hidden w-6/12 bg-gradient-to-br from-blue-500 to-blue-600 md:flex">
          <div className="m-auto">
            <Image src={'/img/two-phone.png'} width="450" height="650" alt="Two phone" />
          </div>
        </section>

        <section className="w-full px-14 py-10 font-poppins md:w-6/12 lg:px-20">
          <div className="flex -translate-x-4 items-center space-x-2">
            <div className="text-4xl">👋</div>
            <h3 className="text-lg font-semibold">CoChat</h3>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold">Login Admin</h2>
            <div className="mt-2 text-sm">Login untuk masuk ke dashboard admin.</div>

            <form onSubmit={handleLogin}>
              <div className="mt-14">
                <div>
                  <FormInput
                    label="Username"
                    value={fields.username}
                    type="text"
                    name="username"
                    onChange={changeHandler}
                  />
                </div>
                <div className="mt-6">
                  <FormInput
                    label="Password"
                    value={fields.password}
                    type="password"
                    name="password"
                    onChange={changeHandler}
                  />
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 accent-blue-500 focus:ring focus:ring-blue-400 focus:ring-offset-1"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Ingat Saya
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-8 block w-full rounded-md bg-primary p-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
                >
                  {isLoading ? <Image src="/gif/circle-loading.gif" width={20} height={20} alt="Loading" /> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admin;
