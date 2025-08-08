import DishCard from '../components/DishCard';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { useI18n } from '../i18n.jsx';

export default function Menu() {
  const { data, loading, error } = useFetch('/api/dishes');
  const dishes = Array.isArray(data) ? data : [];
  const { t } = useI18n();

  return (
    <motion.section
      className="py-16 md:py-20 bg-gedo-cream min-h-[60vh]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-playfair text-3xl sm:text-4xl text-gedo-green mb-3 md:mb-4">{t('signature.viewFull')}</h1>
          <p className="text-gedo-brown max-w-2xl mx-auto text-base sm:text-lg">
            {t('misc.todaysSpecial')}
          </p>
        </div>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-center text-gedo-red">Failed to load menu</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
