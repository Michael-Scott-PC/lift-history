import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ExercisesForDay from '../exercise/ExercisesForDay';

import { renderWeekHelper } from '../../utils/calendarUtils';

const CurrentWeekNav = ({ currentWeek, day, setDay }) => {
  return (
    <Fragment>
      {renderWeekHelper(currentWeek, day, setDay)}
      {/* <ExercisesForDay /> */}
    </Fragment>
  );
};

CurrentWeekNav.propTypes = {};

export default CurrentWeekNav;
