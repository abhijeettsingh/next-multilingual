const Header = async () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300">
      {/* Logo on the left */}
      <div className="text-2xl font-bold">
        <span className="text-blue-600">My</span>Logo
      </div>

      {/* Menu items on the right */}
      <nav className="mr-28">
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-lg text-gray-700 hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-lg text-gray-700 hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-lg text-gray-700 hover:text-blue-600">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-lg text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
