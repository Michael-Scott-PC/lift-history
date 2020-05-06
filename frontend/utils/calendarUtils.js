import css from 'styled-jsx/css';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import monthsAndDays from '../months-and-days.json';

import { renderSelectedMonthProgram } from './scheduleUtils';
import { currentYear, currentMonth, currentDay } from './currentDate';

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
  'Dec',
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

/**
 * @description: Wrap each weekday (Mo, Tu, etc.) in a div.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {requestCallback} handleMonthClick - Render the selected month's data.
 */
export const weekdayWrapper = (classView, handleMonthClick) => {
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

/**
 * @description: Wrap each individual numerical day in a div.
 * @param {string} monthName - The selected month name, e.g. 'Jan'.
 * @param {number} monthIndex - The index of the selected month.
 * @param {Objct} monthsAndDays - Object containing the month and corresponding days in mm/dd format.
 * @param {callbackFunction} handleMonthClick - Render the selected month's data.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {Array} [program] - Contains a schedule of days with exercises.
 */
export const dayWrapper = (monthName, monthIndex, fn, classView, program) => {
  let days = [];
  for (let monthDay of monthsAndDays[monthName]) {
    const [month, day] = monthDay;

    const dayId = uuidv4();
    days.push(
      <Fragment key={dayId}>
        <div
          className={`${classView} ${
            parseInt(month) !== monthIndex
              ? 'neighbor-month-days'
              : 'individual-days'
          }`}
          onClick={e => fn(e)}
        >
          {day[0] === '0' ? day[1] : day}

          {program && renderSelectedMonthProgram(program, month, day)}
        </div>
        <style jsx>{dayStyles}</style>
      </Fragment>
    );
  }
  return days;
};

const dayStyles = css`
  .individual-days {
    display: grid;
    width: 100%;
    justify-self: center;
    justify-items: center;
    align-content: start;
    white-space: nowrap;
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
 * @description: Wrap the selected month in a div with weekdays and
 * corresponding days.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {requestCallback} fn - Different calendar views will have different click event callbacks.
 * @param {bool} show - Controls the display property of different elements/views.
 * @param {string} [selectedMonth] - Contains the selected month if selected.
 * @param {Array} [profile] - Contains the authenticated user's profile.
 */
export const monthWrapper = (classView, fn, show, selectedMonth, profile) => {
  const { program } = profile;
  let monthArr = [];

  // TODO: the Ids need to be fixed. Display 'none' only hides
  // the 'year-view', which means when the 'month-view' html
  // is generated, we have duplicate month Ids - the selected month
  // and the original from the 'year-view'. Possible solution:
  // DETACH the 'year-view' html when 'month-view' is generated.
  if (selectedMonth) {
    const monthIndex = abbrMonths.indexOf(selectedMonth) + 1;
    monthArr.push(
      <div
        className={`month-container ${classView} `}
        style={{ display: show ? 'grid' : 'none' }}
        key={uuidv4()}
        id={monthIndex}
      >
        <h5 className="month-name text-center">{selectedMonth}</h5>
        {selectedMonth && weekdayWrapper(classView, fn)}
        {selectedMonth &&
          dayWrapper(selectedMonth, monthIndex, fn, classView, program)}
        <style jsx>{monthViewStyles}</style>
      </div>
    );
    return monthArr;
  }
};

const monthViewStyles = css`
  .month-view {
    grid-template-columns: repeat(7, minmax(14%, 1fr));
    grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
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
 * @description: Wrap each individual month in a div with weekdays and
 * corresponding days.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {requestCallback} fn - Different calendar views will have different click event callbacks.
 * @param {bool} show - Controls the display property of different elements/views.
 */
export const allMonthsWrapper = (classView, fn, show) => {
  console.log('allMonthsWrapper called.');
  let monthsArr = [];
  let monthIndex = 0;

  // Generate HTML for all 12 months if no month is selected.
  // The month name is the key
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
        {dayWrapper(month, monthIndex, fn, classView)}
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

/**
 * @description: Render the corresponding weekday numbers that go with a selected weekday num.
 * @param {string} fullMonthName - The full month name.
 * @param {Array} [weekRangeArr] - Array containing all 7 weekday nums (typeof string) that form a complete week when a single weekday num is clicked.
 * @param {string} day - The selected weekday num.
 */
export const renderWeekHelper = (weekRangeArr, day) => {
  console.log(day);
  let weekJsx = [];
  // weekJsx.push(
  //   <h5 className="day-view-month-header" key={uuidv4()}>
  //     {fullMonthName}
  //     <div className="day-header">
  //       {day}, {currentYear}
  //     </div>
  //     <style jsx>{monthHeaderStyles}</style>
  //   </h5>
  // );
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

// const monthHeaderStyles = css`
//   .day-view-month-header {
//     grid-column-start: 1;
//     grid-column-end: 8;
//     text-align: center;
//   }
//   .day-header {
//     display: inline;
//     margin-left: 0.5rem;
//   }
// `;

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
