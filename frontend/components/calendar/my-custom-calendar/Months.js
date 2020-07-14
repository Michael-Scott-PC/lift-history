import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { allMonthsWrapper } from '../../../utils/calendarUtils';
import { currentYear } from '../../../utils/currentDate';

const Months = () => {
  return (
    <>
      <h1
        className="year"
        style={{
          display: 'block',
          width: '100%',
          color: 'red',
          marginBottom: '3rem',
          marginLeft: '.5rem',
        }}
      >
        {currentYear}
      </h1>
      {allMonthsWrapper('year-view')}
    </>
  );
};

Months.propTypes = {
  allMonthsWrapper: PropTypes.func.isRequired,
};

export default connect(null, { allMonthsWrapper })(Months);
