import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const Year = props => {
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [currentDateNum, setCurrentDateNum] = useState(currentDate);
  console.log(currentMonth);
  console.log(currentDateNum);

  useEffect(() => {
    console.log('this ran.');
  }, [currentDateNum, currentMonth]);

  return (
    <div>
      <h1>YEAR</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Calendar
          onClickMonth={value => setCurrentMonth(value)}
          showNeighboringMonth={false}
          view="year"
          value={currentMonth}
          tileClassName={currentMonth ? 'active-monthsss' : null}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Calendar
          onClickDay={value => setCurrentDateNum(value)}
          showNeighboringMonth={false}
          view="month"
          value={currentMonth}
        />
      </div>

      <style jsx>{`
        .active-monthsss {
          background-color: #000 !important;
          width: 2rem;
          border: 2px solid red;
        }
      `}</style>
    </div>
  );
};

Year.propTypes = {};

export default Year;
