import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import useSWR from 'swr';
// import { request } from 'graphql-request';

import monthsAndDays from '../../../../months-and-days.json';
import { getMonth, monthWrapper } from '../../../../utils/calendarUtils';
import { currentYear } from '../../../../utils/currentDate';
import privateRoute from '../../../../components/hocs/privateRoute';

const MonthView = props => {
  const [monthHeader, setMonthHeader] = useState('');
  const [day, setDay] = useState('');
  const { allPrograms } = props;

  const handleDayClick = e => {
    if (
      parseInt(e.target.parentNode.innerText[1]) ||
      parseInt(e.target.parentNode.innerText[1]) === 0
    ) {
      console.log('this shouldnt run');
      const day =
        e.target.parentNode.innerText[0] + e.target.parentNode.innerText[1];
      setDay(day);
      setShow(false);
      return;
    }
    const day = e.target.parentNode.innerText[0];
    setDay(day);
    setShow(false);
  };

  useEffect(() => {
    if (props.remainingProps.month) {
      getMonth(props.remainingProps.month, setMonthHeader);
    }
  }, []);

  const backBtnStyle2 = {
    backgroundColor: '#4a4949',
    color: '#fff',
    marginTop: '1rem',
    marginLeft: '2rem',
    marginBottom: '2rem',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
  };

  return (
    <>
      <div className="back-to-year-view-container">
        <Link href="/dashboard/[year]" as={`/dashboard/${currentYear}`}>
          <a className="back-to-year-view">&lt;&lt; {currentYear}</a>
        </Link>
        <h1 className="year">{currentYear}</h1>
      </div>
      <div style={{ display: 'block', width: '100%', marginTop: '1rem' }}>
        {/* <div
          className="button-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            marginLeft: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h5 style={{ fontSize: '1rem', alignSelf: 'end' }}>Week: </h5>

          <button className="btn btn-primary m-1">1</button>
          <button className="btn btn-primary m-1">2</button>
          <button className="btn btn-primary m-1">3</button>
          <button className="btn btn-primary m-1">4</button>
          <button className="btn btn-primary m-1">5</button>
        </div> */}
        <div id="selected-month-view">
          {props.remainingProps.month &&
            monthWrapper(
              'month-view',
              handleDayClick,
              props.remainingProps.month,
              allPrograms
            )}
        </div>
      </div>
      <style jsx>{`
        .back-to-year-view-container {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(7, 1fr);
          margin-top: 2rem;
        }
        .back-to-year-view {
          position: absolute;
          width: 25%;
          text-align: center;
          margin-top: 0.55rem;
        }
        .year {
          color: red;
          grid-column-start: 1;
          grid-column-end: 8;
          text-align: center;
        }
        #selected-month-view {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

const getAllMonthIds = () => {
  const finalList = [];
  for (let month in monthsAndDays) {
    for (let arr of monthsAndDays[month]) {
      finalList.push({
        params: {
          year: `${currentYear}`,
          month: arr[0],
          day: arr[1],
        },
      });
    }
  }
  return finalList;
};

export async function getStaticPaths() {
  // Return a list of possible value for month id
  const paths = getAllMonthIds();
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  console.log('context, index[month].js: ', context);
  // console.log('params, line 120: ', context.params);
  // All of the data has already been received upon login
  // The parms.month is passed to the page in order to be passed to getMonth function
  return {
    props: {
      context: context,
      month: context.params.month,
    },
  };
}

// const mapStateToProps = state => ({
//   programReducer: state.programReducer,
// });

// export default connect(mapStateToProps, {})(MonthView);

export default privateRoute(MonthView);
