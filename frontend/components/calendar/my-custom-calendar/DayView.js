import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { getWeekRange, renderWeekHelper } from '../../../utils/calendarUtils';

const DayView = ({ monthHeader, fullMonthName, day }) => {
  const [show, setShow] = useState(false);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    if (day) {
      setShow(true);
      const weekRange = getWeekRange(monthHeader, day);
      setCurrentWeek(weekRange);
    }
  }, [day]);

  return (
    <div id="day-view-container" style={{ display: show ? 'grid' : 'none' }}>
      {renderWeekHelper(fullMonthName, currentWeek, day)}
      <style jsx>
        {`
          #day-view-container {
            width: 100%;
            grid-template-columns: repeat(7, 1fr);
          }
        `}
      </style>
    </div>
  );
};

DayView.propTypes = {};

export default DayView;
