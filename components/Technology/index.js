import Image from 'next/image';
import TechList from './TechList';

const Technology = () => {
  return (
    <section id="teknologi">
      <div className="container mx-auto">
        <div className="md:flex py-24 border-slate-300 border-t">
          <div className="md:w-6/12">
            <Image
              src="/img/two-phone.png"
              width="615"
              height="884"
              alt="Two phone"
            />
          </div>
          <div className="mt-6 md:w-6/12">
            <div className="font-semibold text-sm lg:text-base tracking-widest">
              TEKNOLOGI YANG DIGUNAKAN
            </div>
            <h2 className="text-2xl md:text-3xl mt-4">
              Teknologi Yang Kami Gunakan Di Dalam Aplikasi Ini Akan Membuat DHH
              Dan Jason Fried Pensiun! 😱
            </h2>
            <p className="text-sm lg:text-base text-slate-500/90 mt-4">
              Lo bisa bayangin DHH sama Jason Fried aja jadi pensiun gegara
              aplikasi ini, apalagi lo yang cuma user dan beban kami, gegara lo
              pake dan daftar di aplikasi ini jadi kita harus bayar server DO
              tiap bulan, mana pas bayar harus tunjuk-tunjukan. Inilah alasan
              kenapa gak usah daftar:
            </p>

            <TechList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
