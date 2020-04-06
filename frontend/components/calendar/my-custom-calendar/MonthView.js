import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import DayView from './DayView';

import { allMonthsWrapper, getMonth } from '../../../utils/calendarUtils';

const MonthView = ({ selectedMonth }) => {
  const [show, setShow] = useState(false);
  const [monthHeader, setMonthHeader] = useState('');
  const [day, setDay] = useState('');

  const handleDayClick = e => {
    const day = e.target.innerText;
    console.log(day);
    setDay(day);
  };

  useEffect(() => {
    if (selectedMonth) {
      getMonth(selectedMonth, setMonthHeader);
      setShow(true);
    }
  }, [selectedMonth]);

  return (
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
      <DayView monthHeader={monthHeader} day={day} />
    </div>
  );
};

MonthView.propTypes = {};

export default MonthView;
