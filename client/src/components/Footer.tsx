import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function GlobalFooter() {
  return (
    <>
      <div className="container mx-auto p-6 dark:text-gray-300">
        <div className="flex flex-wrap justify-between text-sm">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold mb-2">MyApp</h1>
            <p>My First FullStack Project!</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li className="mb-1">
                <Link to="/" className="dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/services" className="dark:hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <ul>
              <li className="mb-1">
                <Link
                  to="mailto:info@myapp.com"
                  className="dark:hover:text-white"
                >
                  info@myapp.com
                </Link>
              </li>
              <li className="mb-1">
                <Link to="tel:+1234567890" className="dark:hover:text-white">
                  +123 456 7890
                </Link>
              </li>
              <li className="mb-1">
                <p>123 Street Name, City, Country</p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-2 text-left">Follow Us</h2>
            <div className="flex space-x-3 justify-start text-left">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-xl dark:hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-xl dark:hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-xl dark:hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-xl dark:hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="container mx-auto text-center text-xs">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
