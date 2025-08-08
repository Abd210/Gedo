import { motion } from 'framer-motion';
import { useI18n } from '../i18n.jsx';
import useFetch from '../hooks/useFetch';

export default function About() {
  const { lang } = useI18n();
  const { data: site } = useFetch('/api/site');
  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-playfair text-4xl text-gedo-green mb-6 text-center">
          {lang === 'ro' ? (site?.aboutTitle_ro || 'Povestea noastră') : (site?.aboutTitle_en || 'Our Story')}
        </h1>
        <div className="text-gedo-brown leading-relaxed space-y-4 whitespace-pre-line">
          {lang === 'ro' ? (site?.aboutBody_ro || '') : (site?.aboutBody_en || '')}
        </div>
      </div>
    </motion.section>
  );
}
