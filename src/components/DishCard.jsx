import { motion } from 'framer-motion';

export default function DishCard({ dish = {} }) {
  return (
    <motion.div
      id={`dish-${dish.id}`}
      className="bg-gedo-cream rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-64 overflow-hidden">
        <img className="w-full h-full object-cover" src={dish.image} alt={dish.name} />
      </div>
      <div className="p-6 border-t-4 border-gedo-green">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-playfair text-xl text-gedo-green">{dish.name}</h3>
          <span className="text-gedo-red font-medium">{dish.price} Lei</span>
        </div>
        <p className="text-gedo-brown text-sm mb-4">{dish.description}</p>
        <div className="flex justify-between items-center">
          {dish.badge && (
            <span className="text-xs text-gedo-gold flex items-center">
              <i className={`fa-solid ${dish.badge.icon} mr-1`}></i> {dish.badge.text}
            </span>
          )}
          <button className="text-gedo-green hover:text-gedo-gold transition">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
