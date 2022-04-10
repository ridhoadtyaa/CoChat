import DisclosureFaq from './Disclosure';

const FAQ = () => {
  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl">
            Pertanyaan Yang Sering Ditanyain
          </h2>
          <p className="opacity-60 text-sm mt-2 sm:w-6/12 md:w-6/12 xl:w-5/12 sm:mx-auto lg:text-base">
            Sebenernya pertanyaan-pertanyaan ini kagak ada yang nanya sih, tapi
            ya ditaruh sini aja siapa tau lo mau baca kan.
          </p>
        </div>

        <DisclosureFaq />
      </div>
    </section>
  );
};

export default FAQ;
