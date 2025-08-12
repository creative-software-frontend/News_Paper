import BusinessSection from '../components/BusinessSection';
import FinanceSection from '../components/FinancePost';
import Headline from '../components/Headline';
import NewsSection from '../components/NewsSection';
import Sports from '../components/Sports';
import Travel from '../components/Travel';

export default function Home() {
  return (
    <div className="">
      <Headline />
      <NewsSection />
      <FinanceSection />
      <Sports />
      <BusinessSection />
      <Travel />
    </div>
  );
}
