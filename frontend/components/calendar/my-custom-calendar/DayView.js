import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DayView = ({ monthHeader, day }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (day) {
      setShow(true);
    }
  }, [day]);

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <h1>DAY VIEW</h1>
      <h5>{monthHeader}</h5>
      <div>{day}</div>
    </div>
  );
};

DayView.propTypes = {};

export default DayView;
