import BusinessSection from '../components/BusinessSection';
import FinanceSection from '../components/FinancePost';
import Headline from '../components/Headline';
import International from '../components/International';
import NavItems from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import Sports from '../components/Sports';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="">
      <NavItems />
      <Headline />
      <NewsSection />
      <FinanceSection />
      <Sports />
      <BusinessSection />
      <International />
      <Footer />
    </div>
  );
}
