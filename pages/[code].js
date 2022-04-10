import Image from 'next/image';
import { useRouter } from 'next/router';
const Chat = () => {
  const router = useRouter();
  const { code } = router.query;
  console.log(router.query);
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col border-2 bg-white">
      <div className="itemx-center flex justify-between bg-slate-100 px-8 py-3">
        <div className="flex items-center space-x-4">
          <div>
            <Image
              className="rounded-full"
              src="/img/taubat.jpg"
              alt=""
              height={40}
              width={40}
            />
          </div>
          <div className="self-center font-semibold">Remaja Taubat</div>
        </div>
        <div className="cursor-pointer self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="w-6"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 40 40"
          >
            <g fill="currentColor">
              <path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002z" />
              <circle cx={20} cy="19.999" r="3.112" />
              <circle cx={20} cy="30.685" r="3.112" />
            </g>
          </svg>
        </div>
      </div>
      <div className="grow px-4">
        <div className="max-w-sm">
          <div className="mt-8 rounded-xl rounded-tl-none bg-slate-100 p-4">
            <div>
              Assalamualaikum. Izin tanya, Ustadz. Hukum bayar internet indihom
              menurut Imam Syafi’i apa ya, Ustadz? Syukron before.
            </div>
            <div className="mt-6 flex items-center">
              <Image
                className="rounded-full"
                src="/img/orang.jpeg"
                alt=""
                height={24}
                width={24}
              />
              <div className="text-md ml-4 text-slate-500">Ahmad Rifai</div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#4A72FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-sm text-black/60">Today, at 15:30</div>
          </div>
        </div>
        <div className="ml-auto max-w-sm">
          <div className="mt-10 rounded-xl rounded-tr-none bg-[#4A72FF] p-4">
            <div className="text-white">
              Waalaikumsalam, tidak apa jika internetnya lancar.
            </div>
            <div className="mt-6 flex items-center">
              <Image
                className="rounded-full"
                src="/img/solmed.jpg"
                alt=""
                height={24}
                width={24}
              />
              <div className="text-md ml-4 text-white">Ustadz Solmed</div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-start space-x-2">
            <div className="text-sm text-black/60">Today, at 15:30</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#4A72FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-6">
        <input
          type="text"
          placeholder="Type a message"
          className="block w-full rounded-full border-2 border-slate-200 py-4 px-8 outline-none placeholder:text-sm placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default Chat;
