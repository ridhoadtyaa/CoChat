import FeatureCard from './FeatureCard';

const cardList = [
  {
    id: 1,
    image: '/img/feature-1.png',
    title: 'Groups to keep in touch',
    desc: 'Keep in touch with the groups of people that matter the most, like your family or coworkers. With group chats, you can share messages, photos, and videos.',
  },
  {
    id: 2,
    image: '/img/feature-2.png',
    title: 'Simple, Reliable Messaging',
    desc: "Message your friends and family for free*. WhatsApp uses your phone's Internet connection to send messages so you can avoid SMS fees.",
  },
  {
    id: 3,
    image: '/img/feature-3.png',
    title: 'Groups to keep in touch',
    desc: "With voice calls, you can talk to your friends and family for free*, even if they're in another country. And with free* video calls, you can have face-to-face conversations.",
  },
];

const FeatureCardList = () => (
  <div className="mt-20 grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:max-w-3xl lg:mx-auto xl:max-w-6xl">
    {cardList.map((card) => {
      return <FeatureCard {...card} key={card.id} />;
    })}
  </div>
);

export default FeatureCardList;
