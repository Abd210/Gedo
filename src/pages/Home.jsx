import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import SignatureDishes from '../components/SignatureDishes';
import TodaysSpecial from '../components/TodaysSpecial';
import Testimonials from '../components/Testimonials';
import Reservation from '../components/Reservation';

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <SignatureDishes />
      <TodaysSpecial />
      <Testimonials />
      <Reservation />
    </>
  );
}
