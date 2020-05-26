import css from 'styled-jsx/css';
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MonthView from './MonthView';

import {
  allMonthsWrapper,
  highlightCurrentDay,
} from '../../../utils/calendarUtils';
import { currentYear } from '../../../utils/currentDate';

const Months = props => {
  // console.log(props);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showMonths, setShowMonths] = useState(true);

  const handleMonthClick = e => {
    const elId = e.target.parentNode.id;

    setShowMonths(false);

    setSelectedMonth(elId);
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
          marginLeft: '.5rem',
        }}
      >
        {currentYear}
      </h1>
      {!selectedMonth &&
        allMonthsWrapper('year-view', handleMonthClick, showMonths)}
      {selectedMonth && (
        <MonthView selectedMonth={selectedMonth} profile={props.profile} />
      )}
    </Fragment>
  );
};

Months.propTypes = {
  allMonthsWrapper: PropTypes.func.isRequired,
};

export default connect(null, { allMonthsWrapper })(Months);
