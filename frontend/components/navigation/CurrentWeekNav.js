import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { renderWeekHelper } from '../../utils/calendarUtils';

const CurrentWeekNav = ({ currentWeek, day, month, weekUrl }) => {
  return (
    <Fragment>{renderWeekHelper(currentWeek, day, month, weekUrl)}</Fragment>
  );
};

CurrentWeekNav.propTypes = {};

export default CurrentWeekNav;
