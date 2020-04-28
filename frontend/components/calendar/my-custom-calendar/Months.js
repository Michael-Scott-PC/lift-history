import css from 'styled-jsx/css';
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MonthView from './MonthView';

import {
  currentYear,
  allMonthsWrapper,
  highlightCurrentDay
} from '../../../utils/calendarUtils';

const Months = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showMonths, setShowMonths] = useState(true);

  const handleMonthClick = e => {
    const el = e.target.parentNode.id;

    // switch 'year-view' to false
    setShowMonths(false);
    // assign month id to selectedMonth and pass to MonthView as prop
    setSelectedMonth(el);
  };

  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <Fragment>
      <h1
        className="year"
        style={{
          display: showMonths ? 'block' : 'none',
          width: '100%',
          color: 'red',
          marginBottom: '3rem',
          marginLeft: '.5rem'
        }}
      >
        {currentYear}
      </h1>
      {allMonthsWrapper('year-view', handleMonthClick, showMonths)}
      <MonthView selectedMonth={selectedMonth} />
    </Fragment>
  );
};

Months.propTypes = {
  allMonthsWrapper: PropTypes.func.isRequired
};

export default connect(null, { allMonthsWrapper })(Months);