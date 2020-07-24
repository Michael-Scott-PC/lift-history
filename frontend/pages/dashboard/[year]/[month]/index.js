import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { revalidateMyProgram } from '../../../../redux/actions/programActions';
import {
  getAllWeeksForMonth,
  checkForNeighborYear,
} from '../../../../utils/calendarUtils';

import abbrMonths from '../../../../abbr-months.json';
import privateRoute from '../../../../components/hocs/privateRoute';
import BackToYearView from '../../../../components/navigation/BackToYearView';
import Month from '../../../../components/calendar/Month';

const MonthView = props => {
  console.log('MonthView props: ', props);
  const [monthHeader, setMonthHeader] = useState('');
  const [allWeeksInMonth, setAllWeeksInMonth] = useState([]);

  const monthIndex = abbrMonths.indexOf(props.remainingProps.month) + 1;
  const allWeeksForMonth = getAllWeeksForMonth(props.remainingProps.month);
  // console.log('allWeeksForMonth: ', allWeeksForMonth);
  const validateYear = checkForNeighborYear(
    props.remainingProps.month,
    allWeeksForMonth
  );
  // console.log('validateYear: ', validateYear);

  const {
    dataSWR,
    authReducer: { jwt, id: userId },
    remainingProps: {
      month,
      year,
      programReducer: { allPrograms },
    },
  } = props;

  useEffect(() => {
    if (month) {
      setMonthHeader(month);
    }
  }, [month, dataSWR]);

  return (
    <>
      <Month
        year={year}
        monthHeader={monthHeader}
        monthIndex={monthIndex}
        validateYear={validateYear}
        allPrograms={allPrograms}
        dataSWR={dataSWR}
        month={month}
      />
    </>
  );
};

// const getAllPossibleRoutes = () => {
//   const finalList = [];
//   for (let month in monthsAndDays) {
//     const allWeeksForMonth = getAllWeeksForMonth(month);
//     const validateYear = checkForNeighborYear(month, allWeeksForMonth);
//     let index = 0;
//     let dateIndex = 0;
//     for (let date of validateYear) {
//       let [month, day, year] = date;
//       let firstIndex = validateYear[index];
//       let lastIndex = validateYear[index + 6];
//       let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
//       finalList.push({
//         params: {
//           year: year,
//           month: month,
//           day: day,
//           week: urlWeekRange,
//         },
//       });
//       dateIndex++;
//       if (dateIndex % 7 === 0) {
//         index += 7;
//       }
//     }
//   }
//   return finalList;
// };

// export async function getStaticPaths() {
//   // Return a list of possible value for month id
//   const paths = getAllPossibleRoutes();
//   return { paths, fallback: false };
// }

// export async function getStaticProps(context) {
//   return {
//     props: {
//       context: context,
//       year: context.params.year,
//       month: context.params.month,
//       weekUrl: context.params.week,
//       day: context.params.day,
//     },
//   };
// }

export async function getStaticPaths() {
  const paths = [];
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // All of the data has already been received upon login
  // The parms.month is passed to the page in order to be passed to getMonth function
  return {
    props: {
      context: context,
      year: context.params.year,
      month: context.params.month,
    },
  };
}

const mapStateToProps = state => ({
  programReducer: state.programReducer,
});

const AuthenticatedMonthView = privateRoute(MonthView);

export default connect(mapStateToProps, { revalidateMyProgram })(
  AuthenticatedMonthView
);

// KEEP for later testing
// const testObj = {
//   scheduleExercise: '2020-07-30T04:00:00.000Z',
//   thisDaysExercises: [
//     {
//       exercise: {
//         nameOfExercise: 'Squat',
//       },
//       thisSetsAndReps: [
//         {
//           sets: 1,
//           reps: 10,
//           weight: 135,
//           rpe: 0,
//           pct: null,
//           toFailure: null,
//           isWarmUp: null,
//         },
//       ],
//     },
//   ],
//   isSuperSet: false,
//   isTripleSet: false,
// };

// if (dataSWR) {
//   dataSWR.push(testObj);
// }
