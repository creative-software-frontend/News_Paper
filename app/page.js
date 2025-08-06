import BusinessSection from "./components/BusinessSection";
import FinanceSection from "./components/FinancePost";
import Headline from "./components/Headline";
import NewsSection from "./components/NewsSection";
import Sports from "./components/Sports";


export default function Home() {
  return (
    <div className="mt-28">
      <Headline/>
      <NewsSection/>
      <FinanceSection/>
      <Sports/>
      <BusinessSection/>
    </div>
  );
}
