import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Months from './Months';

import { highlightCurrentDay } from '../../../utils/calendarUtils';

const YearView = ({ profile }) => {
  // console.log('YearView profile: ', profile);

  useEffect(() => {
    highlightCurrentDay();
  }, []);

  return (
    <>
      <div id="custom-year-container">
        {/* {highlightCurrentDay()} */}
        <Months profile={profile} />
      </div>

      <style jsx>{`
        #custom-year-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 3rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

YearView.propTypes = {};

export default YearView;
