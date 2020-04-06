import css from 'styled-jsx/css';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import monthsAndDays from '../months-and-days.json';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const abbrMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

// TODO: this needs to be fixed.
export const highlightCurrentDay = () => {
  const days = document
    .getElementById(currentMonth)
    .getElementsByClassName('individual-days');

  for (let num of days) {
    if (num.innerText === currentDay.toString()) {
      if (num.parentNode.id === currentMonth.toString()) {
        num.classList.add('current-day');
      }
    }
  }
};

export const weekdayWrapper = (classView, handleMonthClick) => {
  // wrap each individual abbreviated weekday in a div
  console.log('weekdayWrapper ran');
  let weekdays = [];

  weekdays.push(
    abbrWeekdays.map(day => (
      <div
        className={`${classView}`}
        key={uuidv4()}
        onClick={e => handleMonthClick(e)}
      >
        {day}
        <style jsx>{weekdayStyle}</style>
      </div>
    ))
  );
  return weekdays;
};

const weekdayStyle = css`
  .abbr-weekdays {
    font-size: 0.55rem;
  }
  .year-view {
    font-size: 0.55rem;
  }
  .month-view {
    font-size: 1rem;
    text-align: center;
  }
`;

export const dayWrapper = (
  month,
  monthsAndDays,
  handleMonthClick,
  classView
) => {
  // wrap each individual day number in a div
  let days = [];
  for (let dayNum of monthsAndDays[month]) {
    const dayId = uuidv4();
    days.push(
      <Fragment key={dayId}>
        <div
          className={`${classView} individual-days`}
          onClick={e => handleMonthClick(e)}
        >
          {dayNum === 0 ? null : dayNum}
        </div>

        <style jsx>{dayStyles}</style>
      </Fragment>
    );
  }
  return days;
};

const dayStyles = css`
  .individual-days {
    display: flex;
    justify-self: center;
    font-size: 0.65rem;
  }
  .current-day {
    color: #fff;
    background-color: rgb(38, 191, 81);
    width: 100%;
    border-radius: 50%;
    justify-content: center;
  }
`;

/**
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {requestCallback} fn - Different calendar views will have different click event callbacks.
 * @param {bool} show - controls the display property of different elements/views.
 * @param {string} [month] - contains the selected month if selected.
 */
export const allMonthsWrapper = (classView, fn, show, month) => {
  // wrap each individual month in a div
  let monthArr = [];
  let monthsArr = [];
  let monthIndex = 0;

  // Generate HTML when a single month is selected
  // TODO: the Ids need to be fixed. Display 'none' only hides
  // the 'year-view', which means when the 'month-view' html
  // is generated, we have duplicate month Ids - the selected month
  // and the original from the 'year-view'. Possible solution:
  // DETACH the 'year-view' html when 'month-view' is generated.
  if (month) {
    monthArr.push(
      <div
        className={`month-container ${classView} `}
        style={{ display: show ? 'grid' : 'none' }}
        key={uuidv4()}
        id={abbrMonths.indexOf(month) + 1}
      >
        <h5 className="month-name text-center" onClick={e => fn(e)}>
          {month}
        </h5>
        {month && weekdayWrapper(classView, fn)}
        {month && dayWrapper(month, monthsAndDays, fn, classView)}
        <style jsx>{monthViewStyles}</style>
      </div>
    );
    return monthArr;
  }

  // Generate HTML for all 12 months if no month is selected
  // the month name is the key
  for (let month in monthsAndDays) {
    monthsArr.push(
      <div
        className="month-container col-4"
        style={{ display: show ? 'grid' : 'none' }}
        key={uuidv4()}
        id={(monthIndex += 1)}
      >
        <h5 className="month-name text-center" onClick={e => fn(e)}>
          {month}
        </h5>
        {weekdayWrapper(classView, fn)}
        {dayWrapper(month, monthsAndDays, fn, classView)}
        <style jsx>{allMonthsStyles}</style>
      </div>
    );
  }
  return monthsArr;
};

const allMonthsStyles = css`
  .month-container {
    flex-wrap: wrap;
    grid-template-columns: repeat(7, minmax(5px, 1fr));
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 2rem;
    align-content: space-between;
  }
  .month-name {
    grid-column-start: 1;
    grid-column-end: 8;
  }
`;

const monthViewStyles = css`
  .month-view {
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    min-height: 50vh;
  }
  .month-name {
    grid-column-start: 1;
    grid-column-end: 8;
    align-self: center;
  }
`;

export const getMonth = (str, fn) => {
  const num = parseInt(str);
  const monthHeader = abbrMonths[num - 1];
  fn(monthHeader);
};
