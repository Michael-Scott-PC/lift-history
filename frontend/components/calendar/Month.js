import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import BackToYearView from '../navigation/BackToYearView';
import CurrentMonthNav from '../navigation/CurrentMonthNav';
import Weekdays from './Weekdays';
import Days from './Days';

import { monthWrapper, getMonth } from '../../utils/calendarUtils';
import { programHelper } from '../../utils/scheduleUtils';

const Month = ({
  year,
  month,
  monthHeader,
  validateYear,
  monthIndex,
  allPrograms,
  dataSWR,
}) => {
  return (
    <>
      <BackToYearView year={year} />
      <div style={{ display: 'block', width: '100%', marginTop: '1rem' }}>
        <div id="selected-month-view">
          <CurrentMonthNav
            year={year}
            monthHeader={monthHeader}
            monthIndex={monthIndex}
          />
          <Weekdays classView={'month-view'} />
          <Days
            month={month}
            monthIndex={monthIndex}
            classView={'month-view'}
            allPrograms={allPrograms}
            dataSWR={dataSWR}
            validateYear={validateYear}
          />
        </div>
      </div>
      <style jsx>{`
        #selected-month-view {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

Month.propTypes = {};

export default Month;
