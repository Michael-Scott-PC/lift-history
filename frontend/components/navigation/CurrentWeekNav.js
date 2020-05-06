import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ExercisesForDay from '../exercise/ExercisesForDay';

import { renderWeekHelper } from '../../utils/calendarUtils';

const CurrentWeekNav = ({ currentWeek, day }) => {
  return (
    <Fragment>
      {renderWeekHelper(currentWeek, day)}
      {/* <ExercisesForDay /> */}
    </Fragment>
  );
};

CurrentWeekNav.propTypes = {};

export default CurrentWeekNav;
