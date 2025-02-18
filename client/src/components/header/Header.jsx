import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { LiaBarsSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate, useLocation, Link} from "react-router-dom";
import Logo from "../Logo";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Home", path: "#home" },
    { title: "Features", path: "#features" },
    { title: "Reviews", path: "#reviews" },
    { title: "Contact Us", path: "#contact" },
  ];

  useEffect(() => {
    const scrollToHash = () => {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [location]);

  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      if (location.pathname === "/") {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(path.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        navigate(`/${path}`);
      }
    } else {
      navigate(path);
    }

    setState(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", state);
    return () => document.body.classList.remove("overflow-hidden");
  }, [state]);

  return (
    <nav className="bg-white w-full py-3 md:text-md sticky top-0 z-50 shadow-xl">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-8">
        <Link to="/">
        <Logo/>
        </Link>
        <button
          className="menu-btn md:hidden text-gray-500 hover:text-gray-800"
          onClick={() => setState(!state)}
        >
          {state ? (
            <IoMdClose className="text-2xl text-stone-900" />
          ) : (
            <LiaBarsSolid className="text-2xl text-stone-900" />
          )}
        </button>

        <div
          className={`absolute left-0 top-16 w-screen bg-white shadow-md transition-all duration-300 ease-in-out ${
            state ? "block z-50" : "hidden"
          } md:relative md:top-0 md:flex md:shadow-none md:w-auto`}
        >
          <div className="md:flex md:items-center md:gap-8">
            <ul className="flex flex-col space-y-4 px-6 py-4 md:flex-row md:space-y-0 md:space-x-6 md:p-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-stone-800 hover:text-gray-900">
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="px-6 md:p-0 md:flex md:items-center md:space-x-6">
              <Button
                variant="primary-outline"
                onClick={() => {
                  setState(false);
                  navigate("/login");
                }}
                className="block text-gray-800 hover:text-gray-900 mb-4 md:mb-0 bg-indigo-600/10 border-indigo-600 mr-4"
              >
                Log in
              </Button>

              <Button
                variant="primary"
                className="md:mb-0 mb-6 bg-indigo-600 hover:bg-indigo-500"
                onClick={() => {
                  setState(false);
                  navigate("/signup");
                }}
              >
                Sign Up
                <MdNavigateNext className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
