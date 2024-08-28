import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export function GlobalFooter() {
  return (
    <footer className=" text-neutral-600 dark:text-gray-200 py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between relative">
        <div className="text-center md:text-left mb-4 md:mb-0 flex-shrink-0">
          <h1 className="text-xl font-semibold text-neutral-700 dark:text-white">Marketplace</h1>
          <p className="text-sm">My first Fullstack project!</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 flex-grow md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center">
          <Link to="/about" className="hover:text-neutral-950 dark:hover:text-white">
            About Us
          </Link>
          <Link to="/services" className="hover:text-neutral-950 dark:hover:text-white">
            Services
          </Link>
          <Link to="/contact" className="hover:text-neutral-950 dark:hover:text-white">
            Contact
          </Link>
        </div>
        <div className="text-center md:text-right flex space-x-4 mt-4 md:mt-0 flex-shrink-0">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-xl hover:text-neutral-950 dark:hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-xl hover:text-neutral-950 dark:hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-xl hover:text-neutral-950 dark:hover:text-white"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="text-xl hover:text-neutral-950 dark:hover:text-white"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
