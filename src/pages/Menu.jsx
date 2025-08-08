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
      className="py-20 bg-gedo-cream min-h-[60vh]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl text-gedo-green mb-4">{t('signature.viewFull')}</h1>
          <p className="text-gedo-brown max-w-2xl mx-auto">
            {t('misc.todaysSpecial')}
          </p>
        </div>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-center text-gedo-red">Failed to load menu</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
