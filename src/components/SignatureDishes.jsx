import DishCard from './DishCard';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';

export default function SignatureDishes() {
  const { data, loading, error } = useFetch('/api/dishes');
  const dishes = Array.isArray(data) ? data : [];

  return (
    <motion.section
      id="signature-dishes"
      className="py-16 bg-white relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-arabic-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-gedo-green mb-4">
            Our Signature Dishes
          </h2>
          <p className="text-gedo-brown max-w-2xl mx-auto">
            Explore our most beloved dishes, carefully crafted with authentic spices and traditional
            techniques
          </p>
        </div>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-center text-gedo-red">Failed to load dishes</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        <div className="text-center mt-12">
          <span className="inline-block px-8 py-3 bg-gedo-green text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
            View Full Menu
          </span>
        </div>
      </div>
    </motion.section>
  );
}
