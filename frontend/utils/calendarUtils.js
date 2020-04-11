import css from 'styled-jsx/css';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import monthsAndDays from '../months-and-days.json';

const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
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
    text-align: center;
  }
  .month-view {
    font-size: 1rem;
    text-align: center;
  }
`;

export const dayWrapper = (
  month,
  monthIndex,
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
        {parseInt(dayNum[0]) !== monthIndex ? (
          <div className="neighbor-month-days">
            {dayNum[1][0] === '0' ? dayNum[1][1] : dayNum[1]}
          </div>
        ) : (
          <div
            className={`${classView} individual-days`}
            onClick={e => handleMonthClick(e)}
          >
            {dayNum[1][0] === '0' ? dayNum[1][1] : dayNum[1]}
          </div>
        )}

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
  .neighbor-month-days {
    font-size: 0.55rem;
    color: #808080;
    justify-self: center;
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
 * @description: Wrap each individual month in a div with weekdays and
 * corresponding days.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {requestCallback} fn - Different calendar views will have different click event callbacks.
 * @param {bool} show - controls the display property of different elements/views.
 * @param {string} [month] - contains the selected month if selected.
 */
export const allMonthsWrapper = (classView, fn, show, month) => {
  let monthArr = [];
  let monthsArr = [];
  let monthIndex = 0;

  // Generate HTML when a single month is selected
  // TODO: the Ids need to be fixed. Display 'none' only hides
  // the 'year-view', which means when the 'month-view' html
  // is generated, we have duplicate month Ids - the selected month
  // and the original from the 'year-view'. Possible solution:
  // DETACH the 'year-view' html when 'month-view' is generated.
  // e.g. var oldChild = node.removeChild(child);
  if (month) {
    const monthIndex = abbrMonths.indexOf(month) + 1;
    monthArr.push(
      <div
        className={`month-container ${classView} `}
        style={{ display: show ? 'grid' : 'none' }}
        key={uuidv4()}
        id={monthIndex}
      >
        <h5 className="month-name text-center" onClick={e => fn(e)}>
          {month}
        </h5>
        {month && weekdayWrapper(classView, fn)}
        {month && dayWrapper(month, monthIndex, monthsAndDays, fn, classView)}
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
        {dayWrapper(month, monthIndex, monthsAndDays, fn, classView)}
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

/**
 * @description: Retrieve the month abbreviation.
 * Convert the string id to an integer, then get the
 * string month abbreviation.
 * @param {string} month - The selected month.
 * @param {requestCallback} setMonthHeader - The callback
 * to update the state in MonthView.js.
 */
export const getMonth = (month, setMonthHeader) => {
  const num = parseInt(month);
  const monthHeader = abbrMonths[num - 1];
  setMonthHeader(monthHeader);
};

/**
 * @description: The 'month' comes in as a string argument with no zeros.
 * We need to add a zero for months < 10 so it matches the
 * string format in monthsAndDays (months-days-days.json).
 * @param {string} month - The selected month.
 */
const getMonthIndex = month => {
  const monthIndex = abbrMonths.indexOf(month) + 1;
  let monthIndexStr = '';
  if (monthIndex < 10) {
    monthIndexStr = '0' + monthIndex;
  } else {
    monthIndexStr += monthIndex;
  }
  return monthIndexStr;
};

/**
 * @description: Remove any zero in the range 01-09 from the days in
 * monthAndDays so we can compare it to the selectedDay (
 * this gets passed to getWeekRange).
 * We're doing the reverse of what I did in getMonthIndex
 * because eventually the selected week range will return
 * the numbers to be rendered. Rather than remove
 * the zeros in the jsx, I decided to do it here.
 * @param {string} month
 */
const sanitizeDays = month => {
  let sanitizedDays = [];
  for (let subList of monthsAndDays[month]) {
    if (subList[1].charAt(0) === '0') {
      sanitizedDays.push([subList[0], subList[1].substr(1)]);
    } else {
      sanitizedDays.push([subList[0], subList[1]]);
    }
  }
  return sanitizedDays;
};

/**
 * Retrieve the sublist that contains the selectedDay & month.
 * weeks = [Array(7), Array(7), Array(7), and so on]
 * week = [Array(7)]
 * @param {string} month - The selected month.
 * @param {string} selectedDay - The selected day.
 */
export const getWeekRange = (month, selectedDay) => {
  const monthIndexStr = getMonthIndex(month);
  const sanitizedDays = sanitizeDays(month);

  let weeks = [];
  let week = [];

  let index = 0;
  while (index < sanitizedDays.length) {
    weeks.push(sanitizedDays.slice(index, index + 7));
    index += 7;
  }

  for (let arr of weeks) {
    for (let subArr of arr) {
      if (subArr[0] === monthIndexStr && subArr[1] === selectedDay) {
        week.push(arr);
      }
    }
  }
  return week;
};

export const renderWeekHelper = (fullMonthName, weekRangeArr, day) => {
  let weekJsx = [];
  weekJsx.push(
    <h5 className="day-view-month-header" key={uuidv4()}>
      {fullMonthName}
      <div className="day-header">
        {day}, {currentYear}
      </div>
      <style jsx>{monthHeaderStyles}</style>
    </h5>
  );
  for (let item of weekRangeArr) {
    for (let i of item) {
      if (i[1] === day) {
        weekJsx.push(
          <div className="day-view-weekdays selected-day" key={uuidv4()}>
            {i[1]}
            <style jsx>{selectedDayStyles}</style>
          </div>
        );
      } else {
        weekJsx.push(
          <div className="day-view-weekdays" key={uuidv4()}>
            {i[1]}
            <style jsx>{dayViewStyles}</style>
          </div>
        );
      }
    }
  }

  return weekJsx;
};

const monthHeaderStyles = css`
  .day-view-month-header {
    grid-column-start: 1;
    grid-column-end: 8;
    text-align: center;
  }
  .day-header {
    display: inline;
    margin-left: 0.5rem;
  }
`;

const selectedDayStyles = css`
  .selected-day {
    background-color: yellow;
  }
  .day-view-weekdays {
    text-align: center;
  }
`;

const dayViewStyles = css`
  .day-view-weekdays {
    text-align: center;
  }
`;
