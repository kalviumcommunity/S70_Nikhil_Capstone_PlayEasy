import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* PlayEasy Section */}
        <div>
          <h2 className="text-lg font-bold">PlayEasy</h2>
          <p className="text-gray-400 mt-2">Book Cricket grounds and practice nets with ease</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-bold">Support</h2>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Safety Guidelines</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-lg font-bold">Newsletter</h2>
          <p className="text-gray-400 mt-2">Subscribe to get special offers and updates</p>
          <div className="mt-4 flex items-center bg-white rounded-md overflow-hidden">
            <input 
              type="email" 
              placeholder="Your email" 
              className="p-2 w-full text-gray-800 focus:outline-none" 
            />
            <button className="bg-green-500 p-2 px-4 text-white">
              &#9993;
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
