import React from 'react';
import PropTypes from 'prop-types';

import YearView from '../../../components/calendar/my-custom-calendar/YearView';
import privateRoute from '../../../components/hocs/privateRoute';

import monthsAndDays from '../../../months-and-days.json';
import {
  monthWrapper,
  checkForNeighborYear,
  getAllWeeksForMonth,
  getUrlWeekRange,
} from '../../../utils/calendarUtils';

const dashboard = props => {
  console.log('dashboard props: ', props);
  const { profile } = props;

  return (
    <>
      <YearView profile={profile} />

      <style jsx>
        {`
          #dashboard-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 1rem;
          }
          .dashboard-buttons {
            text-align: center;
          }
          .btn {
            width: 85%;
            color: #fff;
            background-color: #758698;
            box-shadow: 5px 5px 5px black;
            box-shadow: 0px 2px 11px #8e8e8e;
          }
          }
          #year-calendar-container {
            padding: 0.75rem;
          }
        `}
      </style>
    </>
  );
};

const getAllPossibleRoutes = () => {
  const finalList = [];
  for (let month in monthsAndDays) {
    const allWeeksForMonth = getAllWeeksForMonth(month);
    const validateYear = checkForNeighborYear(month, allWeeksForMonth);
    let index = 0;
    let dateIndex = 0;
    for (let date of validateYear) {
      let [month, day, year] = date;
      let firstIndex = validateYear[index];
      let lastIndex = validateYear[index + 6];
      let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
      finalList.push({
        params: {
          year: year,
          month: month,
          day: day,
          week: urlWeekRange,
        },
      });
      dateIndex++;
      if (dateIndex % 7 === 0) {
        index += 7;
      }
    }
  }
  // console.log('finalList: ', finalList);
  return finalList;
};

export async function getStaticPaths() {
  // Return a list of possible value for month id
  const paths = getAllPossibleRoutes();
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  console.log('dashboard context: ', context);
  return {
    props: {
      context: context,
      year: context.params.year,
      // month: context.params.month,
      // week: context.params.week,
      // day: context.params.day,
    },
  };
}

dashboard.propTypes = {};

export default privateRoute(dashboard, 'dashboard');
