'use client';
import Chart from 'chart.js/auto';
import React from 'react';

export default function CardLineChart() {
  React.useEffect(() => {
    const ctx = document.getElementById('line-chart').getContext('2d');

    const config = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: '#6366f1',
            borderWidth: 2,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: true,
            tension: 0.3,
          },
          {
            label: new Date().getFullYear() - 1,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            data: [40, 68, 86, 74, 56, 60, 87],
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6b7280',
              font: {
                family: 'Inter, sans-serif',
                size: 12,
                weight: '500',
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: '#1f2937',
            titleColor: '#f9fafb',
            bodyColor: '#f9fafb',
            borderColor: '#374151',
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y} sales`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: '#9ca3af',
              font: {
                family: 'Inter, sans-serif',
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: '#e5e7eb',
              drawBorder: false,
              borderDash: [3],
            },
            ticks: {
              color: '#9ca3af',
              font: {
                family: 'Inter, sans-serif',
                size: 12,
              },
              padding: 10,
            },
            beginAtZero: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
        },
      },
    };

    if (window.myLine) window.myLine.destroy();
    window.myLine = new Chart(ctx, config);

    return () => {
      if (window.myLine) {
        window.myLine.destroy();
        window.myLine = null;
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="rounded-t mb-0 px-6 py-7 bg-transparent">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative">
            <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold tracking-wider">
              Performance Overview
            </h6>
            <h2 className="text-gray-800 text-xl font-semibold">
              Sales Analytics
            </h2>
          </div>
          <div className="relative">
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              View Report
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-80">
          <canvas id="line-chart" />
        </div>
      </div>
      <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>Updated just now</span>
          <div className="flex space-x-2">
            <button className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
              Share
            </button>
            <button className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
