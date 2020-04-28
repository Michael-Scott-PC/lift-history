import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';
import YearView from '../components/calendar/my-custom-calendar/YearView';

const dashboard = props => {
  const [show, setShow] = useState(true);

  // TODO: create a callback to check if DayView is true
  // if it is, display: none the Today & This Week buttons
  const checkForDayView = bool => {
    if (bool) {
      fn(false);
    }
  };

  // const checkForDayView = (bool) => {
  //   if (bool) {
  //     setShow(false);
  //   }
  // };

  return (
    <Layout>
      <div id="dashboard-container">
        <a href="#" className="dashboard-buttons">
          <button className="btn">Dashboard</button>
        </a>
        <a href="#" className={`${show} dashboard-buttons`}>
          <button className="btn">Today</button>
        </a>
        <a href="#" className={`${show} dashboard-buttons`}>
          <button className="btn">This Week</button>
        </a>
      </div>
      <YearView checkForDayView={checkForDayView} />

      <style jsx>
        {`
          #dashboard-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 1rem;
          }
          .dashboard-buttons {
            text-align: center;
          }
          .btn {
            width: 85%;
            color: #fff;
            background-color: #758698;
            box-shadow: 5px 5px 5px black;
            box-shadow: 0px 2px 11px #8e8e8e;
          }
          }
          #year-calendar-container {
            padding: 0.75rem;
          }
        `}
      </style>
    </Layout>
  );
};

dashboard.propTypes = {};

export default dashboard;