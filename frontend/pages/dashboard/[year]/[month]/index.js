import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import useSWR from 'swr';
// import { request } from 'graphql-request';

import Layout from '../../../../components/layout/Layout';

import monthsAndDays from '../../../../months-and-days.json';
import { getMonth, monthWrapper } from '../../../../utils/calendarUtils';
import { currentYear } from '../../../../utils/currentDate';
import privateRoute from '../../../../components/hocs/privateRoute';

const MonthView = props => {
  // console.log('MonthView props: ', props);
  // const fetcher = (url, query) => request(url, query);
  // const { data, error } = useSWR(
  //   [
  //     'http://localhost:1337/graphql',
  //     `{
  //     exercises {
  //       nameOfExercise
  //     }
  //   }`,
  //   ],
  //   fetcher
  // );

  // console.log(data);
  // console.log(error);
  // console.log('props line 10: ', props);
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

  return (
    <Layout>
      <button onClick={() => Router.back()}>BACK</button>
      <h1
        className="year"
        style={{
          display: 'block',
          width: '100%',
          color: 'red',
          marginTop: '2rem',
          marginBottom: '3rem',
          marginLeft: '.5rem',
        }}
      >
        {currentYear}
      </h1>
      <div style={{ display: 'block', width: '100%' }}>
        <div
          className="button-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        >
          <h5 style={{ fontSize: '1rem', alignSelf: 'end' }}>Week: </h5>

          <button className="btn btn-primary m-1">1</button>
          <button className="btn btn-primary m-1">2</button>
          <button className="btn btn-primary m-1">3</button>
          <button className="btn btn-primary m-1">4</button>
          <button className="btn btn-primary m-1">5</button>
        </div>
        <div id="selected-month-view">
          {/* {monthHeader &&
            monthWrapper(
              'month-view',
              handleDayClick,
              monthHeader,
              allPrograms
            )} */}
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
        #selected-month-view {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </Layout>
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
  // const listOfMonthIds = [
  //   '1',
  //   '2',
  //   '3',
  //   '4',
  //   '5',
  //   '6',
  //   '7',
  //   '8',
  //   '9',
  //   '10',
  //   '11',
  //   '12',
  // ];

  // return listOfMonthIds.map(monthId => {
  //   return {
  //     params: {
  //       month: monthId,
  //     },
  //   };
  // });
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
