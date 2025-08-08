import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function PromoBanner() {
  const { data: site } = useFetch('/api/site');
  const [show, setShow] = useState(true);
  useEffect(() => {
    const dismissed = localStorage.getItem('promo.dismissed');
    if (dismissed === '1') setShow(false);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-card flex items-center gap-3">
      <span className="text-gedo-gold"><i className="fa-solid fa-star"></i></span>
      <span className="text-sm">Call now and mention "GEDO" for today’s surprise special!</span>
      <button className="text-gedo-brown text-xs" onClick={() => { localStorage.setItem('promo.dismissed','1'); setShow(false); }}>Dismiss</button>
    </div>
  );
}

