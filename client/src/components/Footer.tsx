import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export function GlobalFooter() {
  return (
    <footer className="bg-gray-800 text-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-white mb-4">MyApp</h1>
            <p className="text-gray-400">
              Providing the best services for our customers. Stay connected for
              more updates and features.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul>
              <li className="mb-2">
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h2>
            <ul>
              <li className="mb-2">
                <a
                  href="mailto:info@myapp.com"
                  className="text-gray-400 hover:text-white"
                >
                  info@myapp.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white"
                >
                  +123 456 7890
                </a>
              </li>
              <li className="mb-2">
                <p className="text-gray-400">123 Street Name, City, Country</p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
