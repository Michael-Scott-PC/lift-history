import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import monthsAndDays from '../../../../months-and-days.json';
import {
  monthWrapper,
  checkForNeighborYear,
  getAllWeeksForMonth,
  getUrlWeekRange,
} from '../../../../utils/calendarUtils';
// import { currentYear } from '../../../../utils/currentDate';
import { revalidateMyProgram } from '../../../../redux/actions/programActions';
import privateRoute from '../../../../components/hocs/privateRoute';

const MonthView = props => {
  console.log('MonthView props: ', props);
  const [monthHeader, setMonthHeader] = useState('');
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

  // const { data: dataSWR, error, isValidating } = useSWR(
  //   [`${process.env.strapiAPI}/graphql`, jwt, userId],
  //   (url, jwt, userId) => revalidateMyProgram(url, jwt, userId)
  // );
  // console.log('dataSWR: ', dataSWR);

  return (
    <>
      <div className="back-to-year-view-container">
        <Link href="/dashboard/[year]" as={`/dashboard/${year}`}>
          <a className="back-to-year-view">&lt;&lt; {year}</a>
        </Link>
        <h1 className="year">{year}</h1>
      </div>
      <div style={{ display: 'block', width: '100%', marginTop: '1rem' }}>
        <div id="selected-month-view">
          {monthHeader &&
            monthHeader === month &&
            monthWrapper('month-view', monthHeader, allPrograms, dataSWR)}
        </div>
      </div>
      <style jsx>{`
        .back-to-year-view-container {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(7, 1fr);
          margin-top: 2rem;
        }
        .back-to-year-view {
          position: absolute;
          width: 25%;
          text-align: center;
          margin-top: 0.55rem;
        }
        .year {
          color: red;
          grid-column-start: 1;
          grid-column-end: 8;
          text-align: center;
        }
        #selected-month-view {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          margin-bottom: 5rem;
        }
      `}</style>
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
