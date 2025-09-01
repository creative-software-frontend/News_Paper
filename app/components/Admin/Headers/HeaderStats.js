'use client';
import React, { useEffect, useState } from 'react';
import CardStats from '../Cards/CardStats';
import axios from 'axios';

// components
{
  /* <FontAwesomeIcon icon={byPrefixAndName.far['newspaper']} />; */
}

export default function HeaderStats() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalUsers = dashboardData?.totalUsers;
  const totalNews = dashboardData?.totalNews;
  const totalCategory = dashboardData?.totalCategory;
  const totalHeadlines = dashboardData?.totalHeadlines;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/dashboard-data');
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // empty dependency array means it runs once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-10 pt-12">
        <div className=" mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="All Users"
                  statTitle={totalUsers}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total News"
                  statTitle={totalNews}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-newspaper" // ✅ updated to match iconMap
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Category"
                  statTitle={totalCategory}
                  statArrow="up"
                  statPercent="1.10"
                  statPercentColor="text-green-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-file-alt" // ✅ updated to match iconMap
                  statIconColor="bg-pink-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Head Line"
                  statTitle={totalHeadlines}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-heading" // ✅ updated to match iconMap
                  statIconColor="bg-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
