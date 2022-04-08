const techList = [
  {
    id: 1,
    emoji: '😠',
    title: 'Kamu Adalah Beban Kami',
    description:
      'Semakin banyak kamu yang mendaftar di aplikasi ini, artinya semakin banyak data yang perlu disimpan, nah kan jadi perlu server gede tuh. Makanya kamu beban!',
  },
  {
    id: 2,
    emoji: '🐨',
    title: 'Males Buat Ngembangin',
    description:
      'Lo bakal nemu bug, entah pesan yang mau dikirim gak bisa dikirim padahal lo belom pencet tombol enter atau masalah lainnya. Nah soal itu kita males buat benerin.',
  },
  {
    id: 3,
    emoji: '😴',
    title: 'Pokoknya Males Aja Lah',
    description:
      'Nggak tau lagi harus ngomong apa, pokoknya males aja sih kita bikin aplikasi chat kek gini. Makannya mending lo pake WhatsApp aja udah.',
  },
];

const TechList = () => (
  <div className="mt-8 space-y-8">
    {techList.map((tech) => (
      <div className="flex items-start space-x-6" key={tech.id}>
        <div className="p-2 rounded-md bg-slate-300/60 text-3xl">
          {tech.emoji}
        </div>
        <div>
          <div className="font-['DM_Sans'] lg:text-lg font-medium">
            {tech.title}
          </div>
          <p className="text-sm lg:text-base text-slate-500/90 mt-2">
            {tech.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default TechList;
