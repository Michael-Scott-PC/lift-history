import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../../../../../components/layout/Layout';
import CurrentWeekNav from '../../../../../components/navigation/CurrentWeekNav';
import ExercisesForDay from '../../../../../components/exercise/ExercisesForDay';
import privateRoute from '../../../../../components/hocs/privateRoute';

import { getWeekRange } from '../../../../../utils/calendarUtils';
import { currentYear } from '../../../../../utils/currentDate';

const DayView = props => {
  // console.log('DayView props: ', props);
  const [currentWeek, setCurrentWeek] = useState([]);
  // console.log('currentWeek: ', currentWeek);

  useEffect(() => {
    if (props.remainingProps.day) {
      const weekRange = getWeekRange(
        props.remainingProps.month,
        props.remainingProps.day
      );
      setCurrentWeek(weekRange);
    }
  }, [props.remainingProps.day]);

  return (
    <Layout>
      <div id="day-view-container" style={{ display: 'grid' }}>
        <h5 className="day-view-month-header" key={uuidv4()}>
          {props.remainingProps.month}
          <div className="day-header">
            {props.remainingProps.day}, {currentYear}
          </div>
        </h5>
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
              width: 100%;
              grid-template-columns: repeat(7, 1fr);
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
    </Layout>
  );
};

// const getAllDayIds = () => {
//   const listOfDayIds = [
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '10',
//     '11',
//     '12',
//   ];
//   return listOfDayIds.map(dayId => {
//     return {
//       params: {
//         month: '10',
//         day: dayId,
//       },
//     };
//   });
// };

// export async function getStaticPaths() {
//   const paths = getAllDayIds();
//   console.log('pathsss from [day]: ', paths);
//   return { paths, fallback: false };
// }

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
