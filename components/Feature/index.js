import FeatureCardList from './FeatureCardList';

const Feature = () => {
  return (
    <section className="py-24" id="fitur">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl">Kenapa Harus Pakai CoChat?</h2>
          <p className="opacity-60 text-sm mt-2 sm:w-6/12 md:w-6/12 xl:w-5/12 sm:mx-auto lg:text-base">
            Sebenernya yang bagus itu sih WhatsApp loh, mending pake WhatsApp
            aja deh. Yaudah berikut ini adalah fitur-fitur WhatsApp.
          </p>
        </div>

        <FeatureCardList />
      </div>
    </section>
  );
};

export default Feature;
