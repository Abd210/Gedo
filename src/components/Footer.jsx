import useFetch from '../hooks/useFetch';
import { phone as fallbackPhone } from '../data';

export default function Footer() {
  const { data: site } = useFetch('/api/site');
  const phone = site?.contactPhone || fallbackPhone;
  const address = site?.contactAddress || 'Str. Ion Maiorescu 18, Obor\nBucharest, Romania';
  const openingHours = site?.openingHours || [
    { label: 'Monday - Thursday', value: '11:00 - 22:00' },
    { label: 'Friday - Saturday', value: '11:00 - 23:00' },
    { label: 'Sunday', value: '12:00 - 21:00' },
  ];
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\n/g, ' '))}`;
  return (
    <footer id="footer" className="bg-white relative">
      <div
        className="h-8 w-full bg-gedo-green"
        style={{ clipPath: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)' }}
      ></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gedo-green rounded-full flex items-center justify-center text-white mr-3">
                <span className="font-playfair text-lg font-bold">G</span>
              </div>
              <h3 className="font-playfair text-xl text-gedo-green">Gedo Restaurant</h3>
            </div>
            <p className="text-gedo-brown text-sm mb-4">
              {site?.welcomeText || 'Authentic Sudanese & Arabic cuisine in the heart of Bucharest. Family recipes, warm hospitality, and the rich flavors of North Africa.'}
            </p>
            <div className="flex space-x-4">
              {site?.social?.facebook ? (
                <a href={site.social.facebook} target="_blank" rel="noreferrer" className="text-gedo-green hover:text-gedo-gold transition cursor-pointer">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              ) : null}
              {site?.social?.instagram ? (
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="text-gedo-green hover:text-gedo-gold transition cursor-pointer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              ) : null}
              {site?.social?.tiktok ? (
                <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="text-gedo-green hover:text-gedo-gold transition cursor-pointer">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              ) : null}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-xl text-gedo-green mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gedo-brown">
              <li className="flex items-start">
                <i className="fa-solid fa-location-dot mt-1 mr-3 text-gedo-gold"></i>
                <span style={{ whiteSpace: 'pre-line' }}>{address}</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-gedo-gold"></i>
                <a href={`tel:${phone}`} className="hover:text-gedo-green transition cursor-pointer">{phone}</a>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-gedo-gold"></i>
                <span className="hover:text-gedo-green transition cursor-pointer">
                  info@gedorestaurant.ro
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-playfair text-xl text-gedo-green mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-gedo-brown">
              {openingHours.map((h, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{h.label}</span>
                  <span>{h.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-playfair text-xl text-gedo-green mb-4">Find Us</h3>
            <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7230bf0586-ec7934d632249cf49069.png"
                alt="Map"
              />
            </div>
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-gedo-green hover:text-gedo-gold transition cursor-pointer">
              <i className="fa-solid fa-directions mr-1"></i> Get Directions
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gedo-brown">
          <p>© 2023 Gedo Restaurant. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <span className="hover:text-gedo-green transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gedo-green transition cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
