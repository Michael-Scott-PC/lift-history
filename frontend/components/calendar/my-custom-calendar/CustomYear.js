import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { calendarHelper, wrapperHelper } from '../../../utils/calendarHelper';

const CustomYear = props => {
  const date = new Date();
  const [currentDate, setCurrentDate] = useState(date);

  return (
    <Fragment>
      <div id="custom-year-container">{calendarHelper()}</div>

      <style jsx>{`
        #custom-year-container {
          /* border: 1px solid red; */
          display: flex;
          flex-wrap: wrap;
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
      `}</style>
    </Fragment>
  );
};

CustomYear.propTypes = {};

export default CustomYear;

// {monthsAndDays &&
//     Object.entries(monthsAndDays).map(item => (
//       <div id="month-container" key={item[0]}>
//         <h5>{item[0]}</h5>
//       </div>

//     ))}
