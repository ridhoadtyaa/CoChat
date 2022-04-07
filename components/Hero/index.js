import Image from 'next/image';
import ButtonIcon from '../ButtonIcon';

const Hero = () => {
  return (
    <section className="container mx-auto py-16 md:flex md:flex-row-reverse">
      <div className="w-full lg:w-5/12 md:pl-8">
        <h1 className="text-3xl leading-snug lg:text-4xl">
          Nikmati chatting aman server lokal Indonesia{' '}
          <Image
            src="/svg/bendera.svg"
            alt="Indonesia"
            width="20"
            height="20"
          />
        </h1>
        <p className="mt-6 opacity-60 lg:text-lg">
          CoChat hadir untuk memberikan kedaulatan layanan pesan sementara
          secara instan Indonesia dengan keamanan yang terjamin
        </p>

        <div className="mt-6 flex justify-between">
          <ButtonIcon icon="/svg/google.svg">Google</ButtonIcon>
          <ButtonIcon icon="/svg/facebook.svg">Facebook</ButtonIcon>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Ketik kode ruangan chat di sini..."
            className="mt-4 block w-full rounded-full border-2 border-blue-500/60 py-2 px-10 focus:outline-none"
          />
          <div className="absolute right-3 top-2 cursor-pointer">
            <Image src="/svg/arrow.svg" width="30" height="30" alt="Go" />
          </div>
        </div>
      </div>
      <div className="mt-16 w-full lg:relative lg:-top-10 lg:mt-0 lg:w-7/12">
        <Image src="/img/hero.png" alt="hero" width="675" height="544" />
      </div>
    </section>
  );
};

export default Hero;
