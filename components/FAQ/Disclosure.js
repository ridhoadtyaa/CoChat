import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

const listFaq = [
  {
    id: 1,
    question: 'Apakah aplikasi ini sudah dapat izin dari MUI?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima eligendi consequatur, consequuntur cupiditate facere voluptas accusamus laboriosam officiis eveniet.',
  },
  {
    id: 2,
    question: 'Apakah aplikasi ini gratis?',
    answer:
      'Ya gratis dong, masa aplikasi chat aja berbayar sih. Lo kalo nanya yang bener dong. Bayangin aja kalo aplikasi ini berbayar, masa pas chat lo harus bayar setiap karakter. Kalo lo mau bayar mending pake MMS aja dah.',
  },
  {
    id: 3,
    question: 'Apakah data saya akan dijual ke agen khusus US?',
    answer:
      'Dipikir pikir kok males mikir. Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.Dipikir pikir kok males mikir.',
  },
  {
    id: 4,
    question: 'Kenapa bumi muter? Apa karena di depan ada yang nikah?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima eligendi consequatur, consequuntur cupiditate facere voluptas accusamus laboriosam officiis eveniet.',
  },
  {
    id: 5,
    question: 'Gimana caranya supaya si Zeldin mau main free fire?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima eligendi consequatur, consequuntur cupiditate facere voluptas accusamus laboriosam officiis eveniet.',
  },
  {
    id: 6,
    question: 'Pertanyaan di atas gabakal ada yang bisa jawab sih',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima eligendi consequatur, consequuntur cupiditate facere voluptas accusamus laboriosam officiis eveniet.',
  },
  {
    id: 7,
    question: 'Kenapa game epep burik, bang?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima eligendi consequatur, consequuntur cupiditate facere voluptas accusamus laboriosam officiis eveniet.',
  },
];

const DisclosureFaq = () => {
  return (
    <div className="w-full pt-16">
      <div className="w-full max-w-2xl p-2 mx-auto space-y-1">
        {listFaq.map((faq) => (
          <Disclosure key={faq.id}>
            {({ open }) => (
              <div className={`${open && 'bg-blue-600/80'} p-4 rounded-lg`}>
                <Disclosure.Button
                  className={`flex justify-between w-full px-4 pt-1 pb-4 font-['DM_Sans'] md:text-lg text-left ${
                    open
                      ? 'text-white border-slate-400'
                      : 'text-black border-slate-300'
                  } border-b`}
                >
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'transform rotate-180 text-white' : 'text-black'
                    } w-7 h-7`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-white">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default DisclosureFaq;
