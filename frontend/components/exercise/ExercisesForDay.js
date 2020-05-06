import React from 'react';
import PropTypes from 'prop-types';

import { renderSelectedDayProgram } from '../../utils/scheduleUtils';

const ExercisesForDay = ({ selectedMonth, day, program }) => {
  console.log(selectedMonth);
  console.log(day);
  console.log(program);
  return (
    <div id="exercises-for-day">
      {renderSelectedDayProgram(program, selectedMonth, day)}
      <style jsx>
        {`
          #exercises-for-day {
            grid-column-start: 1;
            grid-column-end: 8;
            height: 50vh;
            display: grid;
          }
        `}
      </style>
    </div>
  );
};

ExercisesForDay.propTypes = {};

export default ExercisesForDay;
