'use client';
import Chart from 'chart.js/auto';
import React from 'react';

export default function CardBarChart() {
  React.useEffect(() => {
    const ctx = document.getElementById('bar-chart').getContext('2d');

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    const config = {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#7c3aed',
            borderColor: '#7c3aed',
            borderRadius: 6,
            borderWidth: 0,
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 12,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            borderRadius: 6,
            borderWidth: 0,
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 12,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
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
            align: 'center',
            position: 'bottom',
          },
          title: {
            display: false,
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
                return `${context.dataset.label}: ${context.parsed.y} orders`;
              },
            },
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
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
            },
            ticks: {
              color: '#9ca3af',
              font: {
                family: 'Inter, sans-serif',
                size: 12,
              },
              padding: 10,
              callback: function (value) {
                return value + '%';
              },
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
        },
      },
    };

    const chartInstance = new Chart(ctx, config);

    // Cleanup
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="rounded-t mb-0 px-6 py-4 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="text-gray-800 text-xl font-semibold">
              Total Orders Analysis
            </h2>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            <button className="text-xs font-semibold text-purple-600 hover:text-purple-800">
              View Report
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
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
