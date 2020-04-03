import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import abbrWeekdays from '../abbr-weekdays.json';
import monthsAndDays from '../months-and-days.json';

// export const wrapperHelper = arr => {
//   let moreMonths = [];

//   moreMonths.push(<div id="month-container">{arr}</div>);
//   console.log(moreMonths);
// };

export const calendarHelper = () => {
  let finalMonths = [];

  for (let item in monthsAndDays) {
    let months = [];
    months.push(
      <Fragment key={item}>
        <h5 className="month-name text-center">{item}</h5>
        {abbrWeekdays &&
          abbrWeekdays.map(day => <div className="abbr-weekdays">{day}</div>)}
        <style jsx>{`
          .month-name {
            /* border: 1px solid blue; */
            grid-column-start: 1;
            grid-column-end: 8;
          }
          .abbr-weekdays {
            font-size: 0.65rem;
          }
        `}</style>
      </Fragment>
    );
    for (let i of monthsAndDays[item]) {
      if (i !== 0) {
        const id = uuidv4();
        months.push(
          <Fragment key={id}>
            <div className="individual-days">{i}</div>

            <style jsx>{`
              .individual-days {
                display: flex;
                justify-self: center;
                font-size: 0.65rem;
              }
            `}</style>
          </Fragment>
        );
      }
    }
    const topId = uuidv4();
    finalMonths.push(
      <div className="month-container col-4" key={topId}>
        {months}
        <style jsx>{`
          .month-container {
            /* border: 1px solid blue; */
            display: grid;
            flex-wrap: wrap;
            grid-template-columns: repeat(7, minmax(5px, 1fr));
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            margin-bottom: 2rem;
            align-content: space-between;
          }
        `}</style>
      </div>
    );
  }
  return finalMonths;
};

calendarHelper.propTypes = {
  monthsAndDays: PropTypes.object.isRequired
};

// export default calendarHelper;

// import { Fragment } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import PropTypes from 'prop-types';

// import monthsAndDays from '../months-and-days.json';

// const calendarHelper = () => {
//   let months = [];

//   for (let item in monthsAndDays) {
//     months.push(
//       <Fragment key={item}>
//         <div id="month-container">
//           <h5>{item}</h5>
//         </div>

//         <style jsx>{`
//           #month-container {
//             border: 1px solid blue;
//           }
//         `}</style>
//       </Fragment>
//     );
//     for (let i of monthsAndDays[item]) {
//       const id = uuidv4();
//       months.push(
//         <Fragment key={id}>
//           <div id="individual-days">{i}</div>

//           <style jsx>{`
//             #month-container {
//               border: 1px solid blue;
//             }
//             #individual-days {
//               display: flex;
//               border: 1px solid green;
//             }
//           `}</style>
//         </Fragment>
//       );
//     }
//   }
//   return months;
// };

// calendarHelper.propTypes = {
//   monthsAndDays: PropTypes.object.isRequired
// };

// export default calendarHelper;
