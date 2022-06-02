import '@/styles/globals.css';
import AuthStateChangeProvider from '@/context/auth';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/context/user';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} position="top-center" />
      <UserProvider>
        <AuthStateChangeProvider>
          <Component {...pageProps} />
        </AuthStateChangeProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
