import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import CurrentWeekNav from '../../../../../components/navigation/CurrentWeekNav';
import ExercisesForDay from '../../../../../components/exercise/ExercisesForDay';
import privateRoute from '../../../../../components/hocs/privateRoute';

import {
  getWeekRange,
  sanitizeDay,
  weekdayWrapper,
} from '../../../../../utils/calendarUtils';
import { currentYear } from '../../../../../utils/currentDate';

const DayView = props => {
  console.log('DayView props: ', props);
  const {
    month,
    day,
    programReducer: { allPrograms },
  } = props.remainingProps;
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    if (day) {
      const weekRange = getWeekRange(month, day);
      setCurrentWeek(weekRange);
    }
  }, [day]);

  return (
    <div id="day-view-container">
      <Link
        href="/dashboard/[year]/[month]"
        as={`/dashboard/${currentYear}/${month}`}
      >
        <a className="back-to-month-view">&lt;&lt; {month}</a>
      </Link>
      <h5 className="day-view-month-header" key={uuidv4()}>
        {month}
        <div className="day-header">
          {sanitizeDay(day)}, {currentYear}
        </div>
      </h5>
      {day && weekdayWrapper('day-view')}
      <CurrentWeekNav
        currentYear={currentYear}
        currentWeek={currentWeek}
        day={day}
        month={month}
      />
      <ExercisesForDay day={day} program={allPrograms} selectedMonth={month} />
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
  return {
    props: {
      context: context,
      month: context.params.month,
      day: context.params.day,
    },
  };
}

const mapStateToProps = state => ({
  programReducer: state.programReducer,
});

const AuthenticatedDayView = privateRoute(DayView);

export default connect(mapStateToProps, {})(AuthenticatedDayView);
