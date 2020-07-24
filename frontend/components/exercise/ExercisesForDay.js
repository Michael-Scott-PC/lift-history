import React from 'react';
import PropTypes from 'prop-types';

import { programHelper } from '../../utils/scheduleUtils';
// import { useStyles } from '../../utils/scheduleUtils';

const ExercisesForDay = props => {
  console.log('ExerciesForDay props: ', props);
  const { allPrograms, month, day, year, classView, dataSWR } = props;

  return (
    <div id="exercises-for-day" className={`${classView}`}>
      {programHelper(allPrograms, month, day, classView, dataSWR)}
      <style jsx>
        {`
          #exercises-for-day {
            width: 100%;
          }
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
