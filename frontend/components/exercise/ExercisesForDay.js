import React from 'react';
import PropTypes from 'prop-types';

import { renderSelectedDayProgram } from '../../utils/scheduleUtils';

const ExercisesForDay = ({ program, selectedMonth, day, classView }) => {
  return (
    <div id="exercises-for-day" className={`${classView}`}>
      {renderSelectedDayProgram(program, selectedMonth, day, classView)}
      <style jsx>
        {`
          .program-day-view {
            grid-column-start: 1;
            grid-column-end: 8;
            height: 30vh;
            margin-top: 1rem;
          }
          .program-week-view {
          }
        `}
      </style>
    </div>
  );
};

ExercisesForDay.propTypes = {};

export default ExercisesForDay;
