import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import CurrentWeekNav from '../../../../../components/navigation/CurrentWeekNav';
import ExercisesForDay from '../../../../../components/exercise/ExercisesForDay';
import privateRoute from '../../../../../components/hocs/privateRoute';

import {
  getWeekRange,
  sanitizeDay,
  weekdayWrapper,
  getMonth,
} from '../../../../../utils/calendarUtils';
import { currentYear } from '../../../../../utils/currentDate';

import abbrMonths from '../../../../../abbr-months.json';

const DayView = props => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const abbrMonthIndex = abbrMonths.indexOf(props.remainingProps.month) + 1;
    console.log('abbrMonthIndex: ', abbrMonthIndex);
    const abbrMonthLink = getMonth(abbrMonthIndex);
    setCurrentMonth(abbrMonthLink);
    if (props.remainingProps.day) {
      const weekRange = getWeekRange(
        props.remainingProps.month,
        props.remainingProps.day
      );
      setCurrentWeek(weekRange);
    }
  }, [props.remainingProps.day]);

  return (
    <div id="day-view-container">
      <Link
        href="/dashboard/[year]/[month]"
        as={`/dashboard/${currentYear}/${currentMonth}`}
      >
        <a className="back-to-month-view">&lt;&lt; {currentMonth}</a>
      </Link>
      <h5 className="day-view-month-header" key={uuidv4()}>
        {props.remainingProps.month}
        <div className="day-header">
          {sanitizeDay(props.remainingProps.day)}, {currentYear}
        </div>
      </h5>
      {props.remainingProps.day && weekdayWrapper('day-view')}
      <CurrentWeekNav
        currentYear={currentYear}
        currentWeek={currentWeek}
        day={props.remainingProps.day}
        month={props.remainingProps.month}
      />
      <ExercisesForDay
        day={props.remainingProps.day}
        program={props.allPrograms}
        selectedMonth={props.remainingProps.month}
      />
      <style jsx>
        {`
          #day-view-container {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(7, 1fr);
            margin-top: 2rem;
          }
          .back-to-month-view {
            position: absolute;
            width: 25%;
            text-align: center;
          }
           {
            /* .back-to-month-view {
            grid-column-start: 1;
            grid-column-end: 3;
            text-align: center;
          }
          .day-view-month-header {
            grid-column-start: 3;
            grid-column-end: 8;
            margin-left: 1.5rem;
          } */
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
        `}
      </style>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = [];
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  console.log('context, index[day].js: ', context);
  // console.log('params, line 120: ', context.params);
  // All of the data has already been received upon login
  // The parms.month is passed to the page in order to be passed to getMonth function
  return {
    props: {
      context: context,
      month: context.params.month,
      day: context.params.day,
    },
  };
}

export default privateRoute(DayView);
