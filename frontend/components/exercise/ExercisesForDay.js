import React from 'react';
import PropTypes from 'prop-types';

import { renderSelectedDayProgram } from '../../utils/scheduleUtils';

const ExercisesForDay = ({ program, selectedMonth, day }) => {
  return (
    <div id="exercises-for-day">
      {renderSelectedDayProgram(program, selectedMonth, day)}
      <style jsx>
        {`
          #exercises-for-day {
            grid-column-start: 1;
            grid-column-end: 8;
            height: 30vh;
            margin-top: 1rem;
          }
        `}
      </style>
    </div>
  );
};

ExercisesForDay.propTypes = {};

export default ExercisesForDay;
