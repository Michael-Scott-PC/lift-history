import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../../abbr-weekdays.json';

const Weekdays = ({ classView }) => {
  return (
    <div className="weekdays-container">
      {abbrWeekdays.map(weekday => (
        <div className={`${classView} weekday`} key={uuidv4()}>
          {weekday}
        </div>
      ))}
      <style jsx>{`
        .weekdays-container {
          display: grid;
          grid-column: 1 / 8;
          grid-template-columns: repeat(7, 1fr);
        }
        .abbr-weekdays {
          font-size: 0.55rem;
        }
        .year-view {
          font-size: 0.55rem;
          text-align: center;
        }
        .month-view {
          font-size: 1rem;
          text-align: center;
        }
        .month-view.weekday {
          margin-top: 1rem;
          margin-bottom: 0.25rem;
        }
        .day-view {
          text-align: center;
          color: #576777;
          margin-top: 1.5rem;
        }
        .week-view {
          text-align: center;
          color: #576777;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};

Weekdays.propTypes = {
  classView: PropTypes.string.isRequired,
};

export default Weekdays;
