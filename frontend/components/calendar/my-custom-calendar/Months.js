import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { monthWrapper } from '../../../utils/calendarUtils';

const Months = props => {
  const [currentMonth, setCurrentMonth] = useState(null);

  return <Fragment>{monthWrapper()}</Fragment>;
};

Months.propTypes = {};

export default Months;
