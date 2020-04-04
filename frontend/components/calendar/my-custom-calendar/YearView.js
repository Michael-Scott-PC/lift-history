import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import Months from './Months';
import MonthView from './MonthView';

import { handleMonthClick } from '../../../utils/calendarUtils';

import {
  monthWrapper,
  highlightCurrentDay
} from '../../../utils/calendarUtils';

const YearView = props => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <Fragment>
      <h1 className="year">2020</h1>
      <div id="custom-year-container">
        <Months />
      </div>

      <MonthView show={show} />

      <style jsx>{`
        .year {
          color: red;
          padding-left: 0.5rem;
        }
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

YearView.propTypes = {};

export default YearView;
