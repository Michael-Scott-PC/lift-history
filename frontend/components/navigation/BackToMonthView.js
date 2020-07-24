import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { sanitizeDay } from '../../utils/calendarUtils';

const BackToMonthView = ({ year, month, day }) => {
  return (
    <>
      <Link href="/dashboard/[year]/[month]" as={`/dashboard/${year}/${month}`}>
        <a className="back-to-month-view">&lt;&lt; {month}</a>
      </Link>
      <h5 className="day-view-month-header" key={uuidv4()}>
        {month}
        <div className="day-header">
          {sanitizeDay(day)}, {year}
        </div>
      </h5>
      <style jsx>{`
        .back-to-month-view {
          position: absolute;
          width: 25%;
          text-align: center;
        }
        .day-view-month-header {
          grid-column-start: 1;
          grid-column-end: 8;
          text-align: center;
        }
        .day-header {
          display: inline;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
};

BackToMonthView.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
};

export default BackToMonthView;
