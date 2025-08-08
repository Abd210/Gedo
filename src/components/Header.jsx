import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { motion } from 'framer-motion';
import { phone } from '../data';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Admin', path: '/admin' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const location = useLocation();
  const { data: site } = useFetch('/api/site');

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase =
    'text-gedo-green hover:text-gedo-gold transition cursor-pointer font-medium';

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition duration-300 ${
        elevated ? 'bg-white/90 backdrop-blur shadow-lg' : 'bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {site?.logoUrl ? (
            <img src={site.logoUrl} alt="logo" className="w-12 h-12 rounded-full object-cover mr-3 shadow-card" />
          ) : (
            <div className="w-12 h-12 bg-gedo-green rounded-full flex items-center justify-center text-white mr-3">
              <span className="font-playfair text-xl font-bold">G</span>
            </div>
          )}
          <div>
            <h1 className="font-playfair text-gedo-green text-2xl font-bold">Gedo</h1>
            <p className="text-xs text-gedo-brown -mt-1">Sudanese & Arabic Restaurant</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${linkBase} ${location.pathname === item.path ? 'text-gedo-gold' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          <a
            href={`tel:${phone}`}
            className="hidden md:block px-4 py-2 border-2 border-gedo-green text-gedo-green rounded-full hover:bg-gedo-green hover:text-white transition duration-300"
          >
            Call {phone}
          </a>
          <button
            className="md:hidden text-gedo-green text-xl"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={linkBase}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={`tel:${phone}`}
              className="px-4 py-2 border-2 border-gedo-green text-gedo-green rounded-full hover:bg-gedo-green hover:text-white transition duration-300 w-max"
              onClick={() => setMobileOpen(false)}
            >
              Call {phone}
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
