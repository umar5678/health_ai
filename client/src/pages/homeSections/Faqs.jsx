import { faqsList } from "../../data/data";

import { FaqsCard } from "../../components";

export const Faps = () => {
  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8 py-16 md:py-30">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg">
          Answered all frequently asked questions, Still confused? feel free to
          contact us.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
};
