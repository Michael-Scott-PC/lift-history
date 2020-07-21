import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ExercisesForDay from '../../../../../components/exercise/ExercisesForDay';

import privateRoute from '../../../../../components/hocs/privateRoute';
import CurrentWeekNav from '../../../../../components/navigation/CurrentWeekNav';

import { weekdayWrapper } from '../../../../../utils/calendarUtils';

const WeekView = props => {
  console.log('WeekView props: ', props);
  const {
    programReducer: { allPrograms },
    calendarReducer: { weekRange },
    month,
    week,
  } = props.remainingProps;

  const convertWeekUrltoUi = () => {
    const arrays = week.split('-');
    const startMonth = arrays[0].charAt(0) === '0' ? arrays[0][1] : arrays[0];
    const startDay = arrays[1].charAt(0) === '0' ? arrays[1][1] : arrays[1];
    const startYear = arrays[2].slice(2);
    const endMonth = arrays[3].charAt(0) === '0' ? arrays[3][1] : arrays[3];
    const endDay = arrays[4].charAt(0) === '0' ? arrays[4][1] : arrays[4];
    const endYear = arrays[5].slice(2);
    const formatWeekRange =
      startMonth +
      '/' +
      startDay +
      '/' +
      startYear +
      '-' +
      endMonth +
      '/' +
      endDay +
      '/' +
      endYear;
    return formatWeekRange;
  };

  return (
    <div className="week-view-container">
      <h5 className="week-view-month-header">
        {month}
        <div className="week-header">{convertWeekUrltoUi()}</div>
      </h5>
      {weekdayWrapper('week-view')}
      <CurrentWeekNav currentWeek={weekRange} month={month} />
      {weekRange.map(date => {
        const { year, month, day } = date;
        return (
          <ExercisesForDay
            program={allPrograms}
            selectedMonth={month}
            day={day}
            classView={'program-week-view'}
            key={uuidv4()}
          />
        );
      })}
      <style jsx>{`
        .week-view-container {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(7, 1fr);
          margin-top: 2rem;
        }
        .week-view-month-header {
          grid-column-start: 1;
          grid-column-end: 8;
          text-align: center;
        }
        .week-header {
          display: inline;
          margin-left: 0.5rem;
          font-size: 1rem;
          color: #576777;
        }
      `}</style>
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
      week: context.params.week,
    },
  };
}

WeekView.propTypes = {};

const AuthenticatedWeekView = privateRoute(WeekView);

const mapStateToProps = state => ({
  calendarReducer: state.calendarReducer,
  programReducer: state.programReducer,
});

export default connect(mapStateToProps, {})(AuthenticatedWeekView);
