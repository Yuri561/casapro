import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative sticky w-full bg-teal-400 text-gray-900 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md px-8 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-slate-200 text-2xl font-bold">Casa Pro</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 font-medium text-white">
        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
          <a href="#">Home</a>
        </li>
        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
        <button className='cursor-pointer'>
            Log in 
            </button>
        </li>
        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 bg-transparent border rounded px-3">
          <a href="#">Create free account</a>
        </li>
        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-300">
          <ul className="flex flex-col space-y-4 p-6">
            <li>
              <a href="#" className="block py-2 text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</a>
            </li>
            <li>
            <button onClick={() => { onOpenModal(); setIsOpen(false); }} className="block py-2 text-lg hover:text-blue-600">
            Log In</button>
            </li>
            <li>
              <a href="#" className="block py-2 text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Create free account</a>
            </li>
            <li>
              <a href="#" className="block py-2 text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</a>
            </li>
          </ul>
        </div>
      )}

      
    </nav>
  );
};

export default Header;
