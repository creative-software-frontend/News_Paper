import CardBarChart from '@/app/components/Admin/Cards/CardBarChart';
import CardLineChart from '@/app/components/Admin/Cards/CardLineChart';
import CardPageVisits from '@/app/components/Admin/Cards/CardPageVisits';
import CardSocialTraffic from '@/app/components/Admin/Cards/CardSocialTraffic';
import AdminNavbar from '../components/../../components/Admin/Navbars/AdminNavbar';
import HeaderStats from '@/app/components/Admin/Headers/HeaderStats';

const DashboardPage = () => {
  return (
    <>
      <div className="">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
