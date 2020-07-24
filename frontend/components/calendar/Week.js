import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Weekdays from './Weekdays';
import CurrentWeekNav from '../navigation/CurrentWeekNav';
import ExercisesForDay from '../exercise/ExercisesForDay';

const Week = ({ weekRange, allPrograms, month }) => {
  return (
    <>
      <Weekdays classView={'week-view'} />
      <CurrentWeekNav currentWeek={weekRange} month={month} />
      {weekRange.map(date => {
        const { year, month, day } = date;
        return (
          <ExercisesForDay
            allPrograms={allPrograms}
            month={month}
            day={day}
            year={year}
            classView={'program-week-view'}
            key={uuidv4()}
          />
        );
      })}
    </>
  );
};

Week.propTypes = {};

export default Week;
