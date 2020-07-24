import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Day from './Day';
import ExercisesForDay from '../exercise/ExercisesForDay';

import { dayWrapper, getMonth } from '../../utils/calendarUtils';

const Days = props => {
  const {
    month,
    monthIndex,
    classView,
    allPrograms,
    dataSWR,
    validateYear,
  } = props;

  let index = 0;
  let dateIndex = 0;
  const getUrlWeekRange = validateYear => {
    let firstIndex = validateYear[index];
    let lastIndex = validateYear[index + 6];
    let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
    dateIndex++;
    if (dateIndex % 7 === 0) {
      index += 7;
    }
    return urlWeekRange;
  };

  return (
    <div
      className={`${classView} all-days-in-month-container`}
      key={uuidv4()}
      id={monthIndex}
    >
      {validateYear.map(date => {
        const [month, day, year] = date;
        const abbrMonth = getMonth(month);
        const urlWeekRange = getUrlWeekRange(validateYear);

        return (
          <Day
            year={year}
            month={month}
            day={day}
            monthIndex={monthIndex}
            abbrMonth={abbrMonth}
            allPrograms={allPrograms}
            dataSWR={dataSWR}
            urlWeekRange={urlWeekRange}
          />
        );
      })}
      <style jsx>{`
        .month-view {
          display: grid;
          grid-template-columns: repeat(7, minmax(14%, 1fr));
          grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
          width: 100%;
          min-height: 50vh;
        }
      `}</style>
    </div>
  );
};

Days.propTypes = {};

export default Days;
