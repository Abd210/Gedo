import { motion } from 'framer-motion';
import { phone } from '../data';

export default function Reservation() {
  return (
    <motion.section
      id="reserve"
      className="py-16 bg-gedo-green relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-arabic-pattern opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">Reserve / Order</h2>
          <p className="text-gedo-cream text-lg mb-8">
            Call us directly and we’ll happily secure your table or prepare your takeaway.
          </p>

          <a
            href={`tel:${phone}`}
            className="inline-block px-8 py-3 bg-gedo-gold text-white font-medium rounded-full shadow-md hover:bg-white hover:text-gedo-green transition duration-300"
          >
            {phone}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
