import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';

export default function Testimonials() {
  const { data, loading, error } = useFetch('/api/testimonials');
  const testimonials = Array.isArray(data) ? data : [];

  return (
    <motion.section
      id="testimonials"
      className="py-16 bg-white relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-arabic-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-gedo-green mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gedo-brown max-w-2xl mx-auto">
            The authentic taste of Sudan and the Middle East in the heart of Bucharest
          </p>
        </div>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-center text-gedo-red">Failed to load testimonials</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
