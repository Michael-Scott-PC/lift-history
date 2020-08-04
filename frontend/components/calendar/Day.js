import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ExercisesForDay from '../exercise/ExercisesForDay';

import { dayWrapper } from '../../utils/calendarUtils';

const Day = props => {
  // console.log('Day props: ', props);
  const {
    year,
    month,
    monthIndex,
    day,
    abbrMonth,
    allPrograms,
    profile,
    dataSWR,
    urlWeekRange,
  } = props;

  return (
    <Link
      href="/dashboard/[year]/[month]/[week]/[day]"
      as={`/dashboard/${year}/${abbrMonth}/${urlWeekRange}/${day}`}
      key={uuidv4()}
      scroll={false}
    >
      <div
        className={`month-view ${
          parseInt(month) !== monthIndex
            ? 'neighbor-month-days'
            : 'individual-days'
        }`}
      >
        {day[0] === '0' ? day[1] : day}

        <ExercisesForDay
          profile={profile}
          allPrograms={allPrograms}
          dataSWR={dataSWR}
          year={year}
          month={month}
          day={day}
          classView={'program-month-view'}
          key={uuidv4()}
        />

        <style jsx>{`
          .individual-days {
            display: grid;
            width: 100%;
            justify-self: center;
            justify-items: center;
            align-content: start;
            white-space: nowrap;
            font-size: 0.65rem;
          }
          .neighbor-month-days {
            display: grid;
            width: 100%;
            justify-self: center;
            justify-items: center;
            align-content: start;
            white-space: nowrap;
            font-size: 0.65rem;
            color: #808080;
          }
        `}</style>
      </div>
    </Link>
  );
};

Day.propTypes = {};

export default Day;
