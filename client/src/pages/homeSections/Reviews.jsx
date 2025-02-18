import { testimonialsData } from "../../data/data";

export const Reviews = () => {
  return (
    <section id="reviews" className="md:py-24 pt-32 ">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-stone-900 text-3xl font-semibold sm:text-4xl anton-font max-w-sm mx-auto">
            See what others saying about us
          </h3>
          <p className="mt-3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est
            hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna
            lorem, euismod volutpat arcu volutpat et.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonialsData.map((item, idx) => (
              <li key={idx} className="bg-gray-100 p-4 rounded-xl">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <img src={item.avatar} className="w-16 h-16 rounded-full" />
                    <div>
                      <span className="block text-gray-800 font-semibold">
                        {item.name}
                      </span>
                      <span className="block text-gray-600 text-sm mt-0.5">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-700">{item.quote}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
