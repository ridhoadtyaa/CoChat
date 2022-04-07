import Image from 'next/image';

const FeatureCard = ({ image, title, desc }) => (
  <div className="text-center">
    <Image src={image} width="230" height="196" alt="Feature 1" />

    <div className="font-['DM_Sans'] text-lg">{title}</div>
    <p className="opacity-60 mt-3 w-10/12 mx-auto text-sm xl:text-base">
      {desc}
    </p>
  </div>
);

export default FeatureCard;
