import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import DayView from './DayView';

import fullMonthNames from '../../../full-month-names-w-nums';

import { allMonthsWrapper, getMonth } from '../../../utils/calendarUtils';

const MonthView = ({ selectedMonth }) => {
  const [show, setShow] = useState(false);
  const [monthHeader, setMonthHeader] = useState('');
  const [fullMonthName, setFullMonthName] = useState('');
  const [day, setDay] = useState('');

  const handleDayClick = e => {
    const day = e.target.innerText;
    setDay(day);
    setShow(false);
  };

  const getFullMonthName = selectedMonth => {
    if (selectedMonth) {
      for (let key in fullMonthNames) {
        if (fullMonthNames[key].toString() === selectedMonth) {
          setFullMonthName(key);
        }
      }
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      getMonth(selectedMonth, setMonthHeader);
      getFullMonthName(selectedMonth);
      setShow(true);
    }
  }, [selectedMonth]);

  return (
    <Fragment>
      <div style={{ display: show ? 'block' : 'none', width: '100%' }}>
        <div
          className="button-container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}
        >
          <h5 style={{ fontSize: '1rem', alignSelf: 'end' }}>Week: </h5>

          <button className="btn btn-primary m-1">1</button>
          <button className="btn btn-primary m-1">2</button>
          <button className="btn btn-primary m-1">3</button>
          <button className="btn btn-primary m-1">4</button>
          <button className="btn btn-primary m-1">5</button>
        </div>
        <div id="selected-month-view">
          {monthHeader &&
            allMonthsWrapper('month-view', handleDayClick, show, monthHeader)}
        </div>
      </div>
      <DayView
        fullMonthName={fullMonthName}
        monthHeader={monthHeader}
        day={day}
      />
    </Fragment>
  );
};

MonthView.propTypes = {};

export default MonthView;
