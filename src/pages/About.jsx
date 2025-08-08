import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-playfair text-4xl text-gedo-green mb-6 text-center">Our Story</h1>
        <p className="text-gedo-brown leading-relaxed mb-4">
          Gedo Restaurant was founded by Chef Issam “Gedo” Mirghani in 1999, after he fled the civil
          war in Sudan and found a new home in Bucharest. “Gedo” means grandfather in Sudanese
          Arabic, a tribute to the chef’s own grandfather who taught him the secrets of
          heart-warming home cooking back in Khartoum.
        </p>
        <p className="text-gedo-brown leading-relaxed mb-4">
          Hidden in the streets behind Piața Obor, Gedo quickly became an insider spot for expats,
          Arab communities and adventurous locals looking for authentic flavours at honest prices.
          Everyday the menu changes depending on the freshest produce and spices imported from
          Egypt, Syria and Lebanon, while meats are sourced locally and prepared in our own halal
          butchery.
        </p>
        <p className="text-gedo-brown leading-relaxed mb-4">
          Whether you come for our emblematic <strong>Ciorbă de linte</strong>, slow-cooked <strong>Mulah
          Bamia</strong>, or fragrant <strong>Lamb Mandi</strong>, you’ll always be welcomed like family –
          with a cup of cardamom coffee and plenty of warm stories.
        </p>
      </div>
    </motion.section>
  );
}
