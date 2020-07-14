import css from 'styled-jsx/css';
import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import abbrMonths from '../abbr-months.json';
import monthsAndDays from '../months-and-days.json';

import { renderSelectedMonthProgram } from './scheduleUtils';
import { currentYear, currentMonth, currentDay } from './currentDate';

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
 */
export const weekdayWrapper = classView => {
  let weekdays = [];

  weekdays.push(
    abbrWeekdays.map(day => (
      <div className={`${classView} weekday`} key={uuidv4()}>
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
  .month-view.weekday {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  }
  .day-view {
    text-align: center;
    color: #576777;
    margin-top: 1.5rem;
  }
`;

/**
 * @description: Wrap each individual numerical day in a div.
 * @param {string} monthName - The selected month name, e.g. 'Jan'.
 * @param {number} monthIndex - The index of the selected month.
 * @param {string} classView - Adds a class depending on calendar view.
 * @param {Array.<Object>} [allProgram] - Contains the myPrograms res from login that gets stored in allPrograms in programReducer.
 * @param {Array.<Object>} [dataSWR] - Replaces the myPrograms data stored in allProgram that will be used for 'Optimistic UI'.
 */
export const dayWrapper = (
  monthName,
  monthIndex,
  classView,
  allPrograms,
  dataSWR
) => {
  let days = [];
  for (let monthDay of monthsAndDays[monthName]) {
    const [month, day] = monthDay;
    // Even though the monthName argument is the abbreviated month, we need to account
    // for days that belong to neighboring months.
    const abbrMonth = getMonth(month);

    const dayId = uuidv4();
    if (classView === 'year-view') {
      days.push(
        <Fragment key={dayId}>
          <div
            className={`${classView} ${
              parseInt(month) !== monthIndex
                ? 'neighbor-month-days'
                : 'individual-days'
            }`}
          >
            {day[0] === '0' ? day[1] : day}

            {allPrograms &&
              renderSelectedMonthProgram(allPrograms, month, day, dataSWR)}
          </div>
          <style jsx>{dayStyles}</style>
        </Fragment>
      );
    }
    if (classView === 'month-view') {
      days.push(
        <Link
          href="/dashboard/[year]/[month]/[day]"
          as={`/dashboard/${currentYear}/${abbrMonth}/${day}`}
          key={dayId}
        >
          <div>
            <div
              className={`${classView} ${
                parseInt(month) !== monthIndex
                  ? 'neighbor-month-days'
                  : 'individual-days'
              }`}
            >
              {day[0] === '0' ? day[1] : day}

              {allPrograms &&
                renderSelectedMonthProgram(allPrograms, month, day, dataSWR)}
            </div>
            <style jsx>{dayStyles}</style>
          </div>
        </Link>
      );
    }
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
  .year-view.neighbor-month-days {
    font-size: 0.55rem;
  }
  .neighbor-month-days {
    display: grid;
    width: 100%;
    justify-self: center;
    justify-items: center;
    align-content: start;
    white-space: nowrap;
    font-size: 0.65rem;
    color: #808080;
  }
  /* .neighbor-month-days {
    font-size: 0.55rem;
    color: #808080;
    justify-self: center;
  } */
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
 * @param {string} selectedMonth - Contains the selected month.
 * @param {Array.<Object>} [allProgram] - Contains the myPrograms res from login that gets stored in allPrograms in programReducer.
 * @param {Array.<Object>} [dataSWR] - Replaces the myPrograms data stored in allProgram that will be used for 'Optimistic UI'.
 */
export const monthWrapper = (
  classView,
  selectedMonth,
  allPrograms,
  dataSWR
) => {
  let monthArr = [];

  if (selectedMonth) {
    const monthIndex = abbrMonths.indexOf(selectedMonth) + 1;
    const prevMonth = getMonth(monthIndex - 1);
    const nextMonth = getMonth(monthIndex + 1);

    monthArr.push(
      <div
        className={`month-container ${classView} `}
        key={uuidv4()}
        id={monthIndex}
      >
        <Link
          href="/dashboard/[year]/[month]"
          as={`/dashboard/${currentYear}/${prevMonth}`}
        >
          <CustomButton variant="outlined" style={prevBtnStyle}>
            Prev Month
          </CustomButton>
        </Link>
        <h5 className="month-name text-center">{selectedMonth}</h5>
        <Link
          href="/dashboard/[year]/[month]"
          as={`/dashboard/${currentYear}/${nextMonth}`}
        >
          <CustomButton variant="outlined" style={nextBtnStyle}>
            Next Month
          </CustomButton>
        </Link>
        {selectedMonth && weekdayWrapper(classView)}
        {selectedMonth &&
          dayWrapper(
            selectedMonth,
            monthIndex,
            classView,
            allPrograms,
            dataSWR
          )}
        <style jsx>{monthViewStyles}</style>
      </div>
    );
    return monthArr;
  }
};

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
    height: '55%',
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

const monthViewStyles = css`
  .month-view {
    display: grid;
    grid-template-columns: repeat(7, minmax(14%, 1fr));
    grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    min-height: 50vh;
  }
  /* 
    Keep this in case I decide to put a container around weekdays.
    .month-view .weekdayContainer {
    grid-column-start: 1;
    grid-column-end: 8;
    display: grid;
    grid-template-columns: repeat(7, minmax(14%, 1fr));
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  } */
  .month-name {
    /* grid-column-start: 1;
    grid-column-end: 8; */
    grid-column-start: 3;
    grid-column-end: 6;
    align-self: center;
  }
`;

/**
 * @description: Wrap each individual month in a div with weekdays and
 * corresponding days.
 * @param {string} classView - Adds a class depending on calendar view.
 */
export const allMonthsWrapper = classView => {
  let monthsArr = [];
  let monthIndex = 0;

  // Generate HTML for all 12 months if no month is selected.
  // The month name is the key
  for (let month in monthsAndDays) {
    monthIndex += 1;
    monthsArr.push(
      <Link
        href="/dashboard/[year]/[month]"
        as={`/dashboard/${currentYear}/${month}`}
        key={uuidv4()}
      >
        <div
          className="month-container col-4"
          style={{ display: 'grid' }}
          id={monthIndex}
          key={uuidv4()}
        >
          <h5 className="month-name text-center">{month}</h5>
          <>{weekdayWrapper(classView)}</>
          <>{dayWrapper(month, monthIndex, classView)}</>
          <style jsx>{allMonthsStyles}</style>
        </div>
      </Link>
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

 */
export const getMonth = month => {
  const num = parseInt(month);
  const monthHeader = abbrMonths[num - 1];
  return monthHeader;
};

/**
 * @description: The 'month' comes in as a string argument with no zeros.
 * We need to add a zero for months < 10 so it matches the
 * string format in monthsAndDays (months-days-days.json).
 * @param {string} month - The selected month.
 */
export const getMonthIndex = month => {
  const monthIndex = abbrMonths.indexOf(month) + 1;
  let monthIndexStr = '';
  if (monthIndex < 10) {
    monthIndexStr = '0' + monthIndex;
  } else {
    monthIndexStr += monthIndex;
  }
  return monthIndexStr;
};

// /**
//  * @description: Remove any zero in the range 01-09 from the days in
//  * monthAndDays so we can compare it to the selectedDay (
//  * this gets passed to getWeekRange).
//  * We're doing the reverse of what I did in getMonthIndex
//  * because eventually the selected week range will return
//  * the numbers to be rendered. Rather than remove
//  * the zeros in the jsx, I decided to do it here.
//  * @param {string} month
//  */
// const sanitizeDays = month => {
//   console.log('sanitizeDays month: ', month);
//   let sanitizedDays = [];
//   for (let subList of monthsAndDays[month]) {
//     if (subList[1].charAt(0) === '0') {
//       sanitizedDays.push([subList[0], subList[1].substr(1)]);
//     } else {
//       sanitizedDays.push([subList[0], subList[1]]);
//     }
//   }
//   return sanitizedDays;
// };

/**
 * @description - Retrieves the month's corresponding days.
 * @param {string} month - The month name (e.g. 'Feb')
 */
const getMonthDays = month => {
  let allDaysInMonth = [];
  for (let subList of monthsAndDays[month]) {
    allDaysInMonth.push(subList);
  }
  return allDaysInMonth;
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
  const monthDays = getMonthDays(month);

  let weeks = [];
  let week = [];

  let index = 0;
  while (index < monthDays.length) {
    weeks.push(monthDays.slice(index, index + 7));
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
 * @description - The day comes in as a string (e.g. '01', '02', and so on) and sometimes we need to remove the 0.
 * @param {string} day - The day being sanitized.
 */
export const sanitizeDay = day => {
  let sanitizedDay = [];
  if (day.charAt(0) === '0') {
    sanitizedDay.push([day.substr(1)]);
  } else {
    sanitizedDay.push([day]);
  }
  return sanitizedDay;
};

/**
 * @description: Render the corresponding weekday numbers that go with a selected weekday num.
 * @param {Array.<Array.<string><string>>} weekRangeArr - Array containing mm/dd pairs that form a complete week when a single weekday num is clicked.
 * @param {string} day - The selected weekday num.
 */
export const renderWeekHelper = (weekRangeArr, day) => {
  console.log('weekRangeArr: ', weekRangeArr);
  let weekJsx = [];
  for (let item of weekRangeArr) {
    for (let i of item) {
      // Even though the month argument is the abbreviate month, we need to account
      // for days that belong to neighboring months.
      const abbrMonth = getMonth(i[0]);
      if (i[1] === day) {
        weekJsx.push(
          <Link
            href="/dashboard/[year]/[month]/[day]"
            as={`/dashboard/${currentYear}/${abbrMonth}/${i[1]}`}
            key={uuidv4()}
          >
            <div className="day-view-weekdays selected-day" key={uuidv4()}>
              {sanitizeDay(i[1])}
              <style jsx>{selectedDayStyles}</style>
            </div>
          </Link>
        );
      } else {
        weekJsx.push(
          <Link
            href="/dashboard/[year]/[month]/[day]"
            as={`/dashboard/${currentYear}/${abbrMonth}/${i[1]}`}
            key={uuidv4()}
          >
            <div className="day-view-weekdays" key={uuidv4()}>
              {sanitizeDay(i[1])}
              <style jsx>{dayViewStyles}</style>
            </div>
          </Link>
        );
      }
    }
  }

  return weekJsx;
};

const selectedDayStyles = css`
  .selected-day {
    background-color: #00dcff;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
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
