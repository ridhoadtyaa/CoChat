/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useUser } from '@/context/user';
import { toast } from 'react-toastify';

const withProtected = (Pages) => {
  return (props) => {
    const router = useRouter();
    const user = useUser();
    const { isLogin } = user;

    if (!isLogin) {
      router.replace('/');
      toast.error('Silahkan Login terlebih dahulu!');
      return <></>;
    }

    return <Pages {...props} />;
  };
};

export default withProtected;
