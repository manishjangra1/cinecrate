function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
        <p className="text-sm">© 2025 CineCrate. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline text-sm">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline text-sm">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
