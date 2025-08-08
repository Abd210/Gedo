import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Welcome() {
  const { data: site } = useFetch('/api/site');
  return (
    <motion.section
      id="welcome"
      className="py-16 bg-gedo-cream"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-gedo-green mb-8 relative inline-block">
            {site?.welcomeTitle || 'Welcome to Gedo'}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gedo-gold"></span>
          </h2>

          <p className="text-gedo-brown text-lg mb-8 leading-relaxed">
            {site?.welcomeText || `Founded by Chef Mahmoud "Gedo" Ibrahim in 2018, our restaurant brings the authentic flavors of Sudan and the Middle East to Romania. Every dish is prepared with traditional recipes passed down through generations, using carefully selected ingredients that capture the essence of our homeland.`}
          </p>

          <div className="flex justify-center">
            <Link to="/about" className="inline-flex items-center text-gedo-green font-medium hover:text-gedo-gold transition">
              Read Our Story <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
