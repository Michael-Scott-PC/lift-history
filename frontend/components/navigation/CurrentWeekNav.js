import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { renderWeekHelper } from '../../utils/calendarUtils';

const CurrentWeekNav = ({ currentWeek, day, setDay, month }) => {
  return <Fragment>{renderWeekHelper(currentWeek, day, month)}</Fragment>;
};

CurrentWeekNav.propTypes = {};

export default CurrentWeekNav;
