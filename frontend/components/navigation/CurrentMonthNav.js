import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import abbrMonths from '../../abbr-months.json';

import { getMonth } from '../../utils/calendarUtils';

const CustomButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    boxShadow: '0 1px 5px 1px rgba(33, 203, 243, 0.25)',
    borderRadius: 4,
    // color: 'white',
    color: '#2196f3',
    borderColor: 'rgba(33, 150, 243, 0.25)',
    fontSize: '0.75rem',
    paddingLeft: 0,
    paddingRight: 0,
    alignSelf: 'center',
    textTransform: 'capitalize',
    '&:hover': {
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .50)',
    },
    '&:focus': {
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .70)',
      outline: 'none',
    },
  },
})(Button);

const prevBtnStyle = {
  gridColumnStart: 1,
  gridColumnEnd: 3,
};

const nextBtnStyle = {
  gridColumnStart: 6,
  gridColumnEnd: 8,
};

const CurrentMonthNav = props => {
  //   const monthIndex = abbrMonths.indexOf(props.monthHeader) + 1;
  const prevMonth = getMonth(props.monthIndex - 1);
  const nextMonth = getMonth(props.monthIndex + 1);
  return (
    <div className="current-month-nav-container">
      <Link
        href="/dashboard/[year]/[month]"
        as={`/dashboard/${props.year}/${prevMonth}`}
        scroll={false}
      >
        <CustomButton variant="outlined" style={prevBtnStyle}>
          Prev Month
        </CustomButton>
      </Link>
      <h5 className="month-name text-center">{props.monthHeader}</h5>
      <Link
        href="/dashboard/[year]/[month]"
        as={`/dashboard/${props.year}/${nextMonth}`}
        scroll={false}
      >
        <CustomButton variant="outlined" style={nextBtnStyle}>
          Next Month
        </CustomButton>
      </Link>
      <style jsx>{`
        .current-month-nav-container {
          display: grid;
        }
        .month-name {
          grid-column: 3/6;
        }
      `}</style>
    </div>
  );
};

CurrentMonthNav.propTypes = {};

export default CurrentMonthNav;
