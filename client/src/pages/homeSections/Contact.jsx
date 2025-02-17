import { useState } from "react";
import imgForContact from "../../images/img-contact.webp";
import ContactService from "../../services/contact.services";
import { ApiError } from "../../api/ApiError";
import { LoadingScreen } from "../../components";
import toast, { Toaster } from "react-hot-toast";

export const Contact = () => {
  const servicesItems = [
    "Diet Plans",
    "Health Monitering",
    "Enhance Sleep Quality",
    "Fitness",
    "Yoga",
  ];
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const res = await ContactService.sendContactMessage(formData);
      if (res instanceof ApiError) {
        toast.error(res.errorMessage);
      } else {
        console.log(res);
        toast.success("Message sent successfully! ✅");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          services: [],
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="contact" className="flex overflow-hidden pb-16 mt-14">
      <Toaster position="top-center" reverseOrder={false} />
      {loading && (
        <>
          <LoadingScreen />
        </>
      )}

      <div className="flex-1 hidden lg:block">
        <img src={imgForContact} className="w-full h-screen object-cover" />
      </div>
      <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
        <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
          <div>
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Get in touch
            </h3>
            <p className="mt-3">
              We’d love to hear from you! Please fill out the form bellow.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 mt-12 lg:pb-12">
            {/* {error && (
              <>
                <p className="text-red-600 text-center p-3 bg-red-500/5 rounded-lg font-bold">
                  {error}
                </p>
              </>
            )} */}
            {/* {successMessage && (
              <p className="text-green-600 text-center p-3 bg-green-500/5 rounded-lg font-bold">
                {successMessage}
              </p>
            )} */}
            <div>
              <label className="font-medium">Full name</label>
              <input
                name="fullName"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                value={formData.fullName}
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                name="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone number</label>
              <div className="relative mt-2">
                <input
                  name="phone"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  value={formData.phone}
                  type="number"
                  placeholder="+92 3012345678"
                  required
                  className="w-full pl-3 pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Services</label>
              <ul className="grid gap-y-2 gap-x-6 flex-wrap grid-cols-2 mt-3">
                {servicesItems.map((item, idx) => (
                  <li key={idx} className="flex gap-x-3 text-sm">
                    <div>
                      <input
                        id={`service-${idx}`}
                        type="checkbox"
                        className="checkbox-item peer hidden"
                        name="services"
                        value={item}
                        checked={formData.services.includes(item)}
                        onChange={(e) => {
                          const service = e.target.value;
                          setFormData((prevData) => {
                            const updatedServices = prevData.services.includes(
                              service
                            )
                              ? prevData.services.filter((s) => s !== service)
                              : [...prevData.services, service];

                            return { ...prevData, services: updatedServices };
                          });
                        }}
                      />
                      <label
                        htmlFor={`service-${idx}`}
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      ></label>
                    </div>
                    <label
                      htmlFor={`service-${idx}`}
                      className="cursor-pointer"
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
