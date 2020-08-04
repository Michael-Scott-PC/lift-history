import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import BackToMonthView from '../../../../../../components/navigation/BackToMonthView';
import CurrentWeekNav from '../../../../../../components/navigation/CurrentWeekNav';
import ExercisesForDay from '../../../../../../components/exercise/ExercisesForDay';
import Weekdays from '../../../../../../components/calendar/Weekdays';
import privateRoute from '../../../../../../components/hocs/privateRoute';

import {
  getWeekRange,
  sanitizeDay,
  // weekdayWrapper,
  checkForNeighborYear,
} from '../../../../../../utils/calendarUtils';

import {
  setCurrentWeekRangeGlobal,
  setCurrentWeekURLGlobal,
} from '../../../../../../redux/actions/calendarActions';

const DayView = props => {
  // console.log('DayView props: ', props);
  const { dataSWR } = props;
  const {
    year,
    month,
    weekUrl,
    day,
    programReducer: { allPrograms },
    setCurrentWeekRangeGlobal,
    setCurrentWeekURLGlobal,
  } = props.remainingProps;
  const [currentWeek, setCurrentWeek] = useState([]);

  const [urlWeekRange, setUrlWeekRange] = useState('');

  const getUrlWeekRange = validateYear => {
    let firstIndex = validateYear[0];
    let lastIndex = validateYear[validateYear.length - 1];
    let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
    setUrlWeekRange(urlWeekRange);
  };

  useEffect(() => {
    if (day) {
      const weekRange = getWeekRange(month, day);
      const validateYear = checkForNeighborYear(month, weekRange);
      setCurrentWeek(
        validateYear.map(date => {
          const [month, day, year] = date;
          return {
            month: month,
            day: day,
            year: year,
          };
        })
      );
      setCurrentWeekURLGlobal(weekUrl);
      setCurrentWeekRangeGlobal(validateYear);
      getUrlWeekRange(validateYear);
    }
  }, [day]);

  return (
    <div id="day-view-container">
      <BackToMonthView year={year} month={month} day={day} />
      <Weekdays classView={'day-view'} />
      <CurrentWeekNav
        currentWeek={currentWeek}
        day={day}
        month={month}
        weekUrl={weekUrl}
      />
      <ExercisesForDay
        day={day}
        month={month}
        allPrograms={allPrograms}
        selectedMonth={month}
        classView={'program-day-view'}
        dataSWR={dataSWR}
      />
      <Link
        href="/dashboard/[year]/[month]/[week]"
        as={`/dashboard/${year}/${month}/${urlWeekRange}`}
      >
        <button>Week View</button>
      </Link>
      <style jsx>
        {`
          #day-view-container {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(7, 1fr);
            margin-top: 2rem;
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
      year: context.params.year,
      month: context.params.month,
      weekUrl: context.params.week,
      day: context.params.day,
    },
  };
}

const mapStateToProps = state => ({
  programReducer: state.programReducer,
});

const AuthenticatedDayView = privateRoute(DayView);

export default connect(mapStateToProps, {
  setCurrentWeekRangeGlobal,
  setCurrentWeekURLGlobal,
})(AuthenticatedDayView);
