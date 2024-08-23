import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export function GlobalFooter() {
  return (
    <footer className="bg-gray-800 text-gray-100">
      <div className="container mx-auto p-8">
        <div className="flex flex-wrap justify-between text-sm">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-2xl font-semibold text-white mb-2">MyApp</h1>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore, sed.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h2>
            <ul>
              <li className="mb-1">
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-1">
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

          {/* Contact Information */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-white mb-2">
              Contact Us
            </h2>
            <ul>
              <li className="mb-1">
                <a
                  href="mailto:info@myapp.com"
                  className="text-gray-400 hover:text-white"
                >
                  info@myapp.com
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white"
                >
                  +123 456 7890
                </a>
              </li>
              <li className="mb-1">
                <p className="text-gray-400">123 Street Name, City, Country</p>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold text-white mb-2">Follow Us</h2>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-700 p-4">
        <div className="container mx-auto text-center text-gray-300 text-xs">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
