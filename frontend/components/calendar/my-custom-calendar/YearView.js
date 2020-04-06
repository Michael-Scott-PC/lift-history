import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import Months from './Months';

import { highlightCurrentDay } from '../../../utils/calendarUtils';

const YearView = props => {
  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <Fragment>
      <h1 className="year">2020</h1>
      <div id="custom-year-container">
        <Months />
      </div>

      <style jsx>{`
        .year {
          color: red;
          padding-left: 0.5rem;
        }
        #custom-year-container {
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
