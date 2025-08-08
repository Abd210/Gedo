import { motion } from 'framer-motion';
import { phone } from '../data';

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 md:pt-32 h-[700px] md:h-[800px] relative overflow-hidden bg-gedo-green bg-opacity-95 bg-arabic-pattern bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gedo-green/80 to-gedo-green/95"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center pt-8 md:pt-16"
        >
          {/* Logo plate */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border-8 border-gedo-cream">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-gedo-green rounded-full flex items-center justify-center">
              <h2 className="font-playfair text-white text-5xl md:text-6xl font-bold italic">Gedo</h2>
            </div>
          </div>

          <h1 className="font-playfair text-3xl md:text-5xl text-white font-bold mb-4 max-w-3xl">
            Authentic Sudanese & Arabic Cuisine in Bucharest
          </h1>

          <p className="text-gedo-cream text-lg md:text-xl mb-10 max-w-2xl">
            Home-cooked warmth and rich flavors from Khartoum to Obor
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <span className="px-8 py-3 bg-white text-gedo-green font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer">
              <i className="fa-solid fa-utensils mr-2"></i> View Menu
            </span>
            <a href={`tel:${phone}`} className="px-8 py-3 bg-gedo-gold text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <i className="fa-regular fa-calendar-check mr-2"></i> Call {phone}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-gedo-cream"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-gedo-cream opacity-30"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}
      ></div>
    </section>
  );
}
