import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import Months from './Months';

import { highlightCurrentDay } from '../../../utils/calendarUtils';

const YearView = props => {
  console.log(props);
  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <Fragment>
      <div id="custom-year-container">
        <Months profile={props.profile} />
      </div>

      <style jsx>{`
        .year {
          color: red;
          padding-left: 0.5rem;
          width: 100%;
        }
        #custom-year-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 3rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </Fragment>
  );
};

YearView.propTypes = {};

export default YearView;
