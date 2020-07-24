import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Months from '../../../components/calendar/Months';
import privateRoute from '../../../components/hocs/privateRoute';

import monthsAndDays from '../../../months-and-days.json';
import {
  checkForNeighborYear,
  getAllWeeksForMonth,
  highlightCurrentDay,
} from '../../../utils/calendarUtils';

const YearView = props => {
  console.log('YearView props: ', props);
  const { profile } = props;

  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <>
      <div id="custom-year-container">
        <Months profile={profile} />
      </div>

      <style jsx>{`
        #custom-year-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 3rem;
          margin-bottom: 5rem;
        }
      `}</style>
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
  return finalList;
};

export async function getStaticPaths() {
  // Return a list of possible value for month id
  const paths = getAllPossibleRoutes();
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  return {
    props: {
      context: context,
      year: context.params.year,
    },
  };
}

YearView.propTypes = {};

export default privateRoute(YearView);
