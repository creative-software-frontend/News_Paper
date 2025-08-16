import BusinessSection from '../components/BusinessSection';
import FinanceSection from '../components/FinancePost';
import Headline from '../components/Headline';
import International from '../components/International';
import NewsSection from '../components/NewsSection';
import Sports from '../components/Sports';

export default function Home() {
  return (
    <div className="">
      <Headline />
      <NewsSection />
      <FinanceSection />
      <Sports />
      <BusinessSection />
      <International />
    </div>
  );
}
