import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// FontAwesome imports
import {
  faUsers,
  faNewspaper,
  faFileAlt,
  faHeading,
  faChartBar,
  faChartPie,
  faPercent,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { faChartBar as farChartBar } from '@fortawesome/free-regular-svg-icons';

// Icon mapping
const iconMap = {
  'fas fa-users': faUsers, // Users
  'fas fa-newspaper': faNewspaper, // Total News
  'fas fa-file-alt': faFileAlt, // My News
  'fas fa-heading': faHeading, // Headline
  'fas fa-chart-bar': faChartBar,
  'far fa-chart-bar': farChartBar,
  'fas fa-chart-pie': faChartPie,
  'fas fa-percent': faPercent,
  'fas fa-arrow-up': faArrowUp,
  'fas fa-arrow-down': faArrowDown,
};

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  const iconToShow = iconMap[statIconName] || faUsers; // fallback icon

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl text-blueGray-700">
              {statTitle}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div
              className={
                'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                statIconColor
              }
            >
              <FontAwesomeIcon icon={iconToShow} size="lg" />
            </div>
          </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4 flex">
          <span className={`${statPercentColor} mr-2 flex`}>
            <FontAwesomeIcon
              icon={
                statArrow === 'up'
                  ? faArrowUp
                  : statArrow === 'down'
                  ? faArrowDown
                  : null
              }
              className="mr-1 w-2"
            />
            {statPercent}%
          </span>
          <span className="whitespace-nowrap">{statDescripiron}</span>
        </p>
      </div>
    </div>
  );
}

CardStats.defaultProps = {
  statSubtitle: 'Traffic',
  statTitle: '350,897',
  statArrow: 'up',
  statPercent: '3.48',
  statPercentColor: 'text-emerald-500',
  statDescripiron: 'Since last month',
  statIconName: 'fas fa-users', // default
  statIconColor: 'bg-red-500',
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(['up', 'down']),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
};
