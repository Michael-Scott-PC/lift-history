import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { sendToMonthView } from '../../../utils/calendarUtils';

const MonthView = (props, { show, element }) => {
  console.log(props);
  console.log(show);
  console.log(element);

  useEffect(() => {}, []);

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <h1>MONTH VIEW</h1>
    </div>
  );
};

MonthView.propTypes = {};

export default MonthView;
