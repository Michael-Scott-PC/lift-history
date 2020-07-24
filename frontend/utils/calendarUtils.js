import css from 'styled-jsx/css';
import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import abbrMonths from '../abbr-months.json';
import monthsAndDays from '../months-and-days.json';

import Weekdays from '../components/calendar/Weekdays';
import ExercisesForDay from '../components/exercise/ExercisesForDay';

import { programHelper } from './scheduleUtils';
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

// /**
//  * @description: Wrap each weekday (Mo, Tu, etc.) in a div.
//  * @param {string} classView - Adds a class depending on calendar view.
//  */
// export const weekdayWrapper = classView => {
//   let weekdays = [];

//   weekdays.push(
//     abbrWeekdays.map(day => (
//       <div className={`${classView} weekday`} key={uuidv4()}>
//         {day}
//         <style jsx>{weekdayStyle}</style>
//       </div>
//     ))
//   );
//   return weekdays;
// };

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
  .week-view {
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
  const allWeeksForMonth = getAllWeeksForMonth(monthName);
  const validateYear = checkForNeighborYear(monthName, allWeeksForMonth);

  let index = 0;
  let dateIndex = 0;
  validateYear.map(date => {
    const [month, day, year] = date;

    // Even though the monthName argument is the abbreviated month, we need to account
    // for days that belong to neighboring months.
    const abbrMonth = getMonth(month);

    if (classView === 'year-view') {
      days.push(
        <Fragment key={uuidv4()}>
          <div
            className={`${classView} ${
              parseInt(month) !== monthIndex
                ? 'neighbor-month-days'
                : 'individual-days'
            }`}
          >
            {day[0] === '0' ? day[1] : day}
          </div>
          <style jsx>{dayStyles}</style>
        </Fragment>
      );
    }
    // if (classView === 'month-view') {
    //   let firstIndex = validateYear[index];
    //   let lastIndex = validateYear[index + 6];
    //   let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
    //   days.push(
    //     <Link
    //       href="/dashboard/[year]/[month]/[week]/[day]"
    //       as={`/dashboard/${year}/${abbrMonth}/${urlWeekRange}/${day}`}
    //       key={uuidv4()}
    //       scroll={false}
    //     >
    //       <div>
    //         <div
    //           className={`${classView} ${
    //             parseInt(month) !== monthIndex
    //               ? 'neighbor-month-days'
    //               : 'individual-days'
    //           }`}
    //         >
    //           {day[0] === '0' ? day[1] : day}

    //           <ExercisesForDay
    //             allPrograms={allPrograms}
    //             dataSWR={dataSWR}
    //             year={year}
    //             month={month}
    //             day={day}
    //             classView={'program-month-view'}
    //             key={uuidv4()}
    //           />
    //         </div>
    //         <style jsx>{dayStyles}</style>
    //       </div>
    //     </Link>
    //   );
    // dateIndex++;
    // if (dateIndex % 7 === 0) {
    //   index += 7;
    // }
    // }
  });
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

// /**
//  * @description: Wrap the selected month in a div with weekdays and
//  * corresponding days.
//  * @param {string} classView - Adds a class depending on calendar view.
//  * @param {string} selectedMonth - Contains the selected month.
//  * @param {Array.<Object>} [allProgram] - Contains the myPrograms res from login that gets stored in allPrograms in programReducer.
//  * @param {Array.<Object>} [dataSWR] - Replaces the myPrograms data stored in allProgram that will be used for 'Optimistic UI'.
//  */
// export const monthWrapper = (
//   classView,
//   selectedMonth,
//   allPrograms,
//   dataSWR
// ) => {
//   let monthArr = [];

//   if (selectedMonth) {
//     const monthIndex = abbrMonths.indexOf(selectedMonth) + 1;

//     monthArr.push(
//       <div
//         className={`month-container ${classView} `}
//         key={uuidv4()}
//         id={monthIndex}
//       >
//         {selectedMonth &&
//           dayWrapper(
//             selectedMonth,
//             monthIndex,
//             classView,
//             allPrograms,
//             dataSWR
//           )}
//         <style jsx>{monthViewStyles}</style>
//       </div>
//     );
//     return monthArr;
//   }
// };

// const monthViewStyles = css`
//   .month-view {
//     display: grid;
//     grid-template-columns: repeat(7, minmax(14%, 1fr));
//     grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
//     width: 100%;
//     min-height: 50vh;
//   }
//   /*
//     Keep this in case I decide to put a container around weekdays.
//     .month-view .weekdayContainer {
//     grid-column-start: 1;
//     grid-column-end: 8;
//     display: grid;
//     grid-template-columns: repeat(7, minmax(14%, 1fr));
//     margin-top: 1rem;
//     margin-bottom: 0.25rem;
//   } */
//   .month-name {
//     /* grid-column-start: 1;
//     grid-column-end: 8; */
//     grid-column-start: 3;
//     grid-column-end: 6;
//     align-self: center;
//   }
// `;

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
        scroll={false}
      >
        <div
          className="month-container col-4"
          style={{ display: 'grid' }}
          id={monthIndex}
          key={uuidv4()}
        >
          <h5 className="month-name text-center">{month}</h5>
          <Weekdays classView={classView} />
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

export const checkForNeighborYear = (month, weeks) => {
  const previousYear = currentYear - 1;
  const nextYear = currentYear + 1;
  let previousYearDec = [];
  let currentYearDates = [];
  let nextYearJan = [];
  let combineDates = [];
  let index = 0;
  if (month === 'Jan') {
    while (index < weeks.length) {
      for (let date of weeks[index]) {
        const [month, day] = date;
        if (month === '12') {
          previousYearDec.push([month, day, `${previousYear}`]);
        } else {
          currentYearDates.push([month, day, `${currentYear}`]);
        }
      }
      index++;
    }
  }
  if (month === 'Dec') {
    while (index < weeks.length) {
      for (let date of weeks[index]) {
        const [month, day] = date;
        if (month === '01') {
          nextYearJan.push([month, day, `${nextYear}`]);
        } else {
          currentYearDates.push([month, day, `${currentYear}`]);
        }
      }
      index++;
    }
  } else if (month !== 'Jan' && month !== 'Dec') {
    while (index < weeks.length) {
      for (let date of weeks[index]) {
        const [month, day] = date;
        currentYearDates.push([month, day, `${currentYear}`]);
      }
      index++;
    }
  }
  combineDates.push(...previousYearDec, ...currentYearDates, ...nextYearJan);
  return combineDates;
};

/**
 *
 * @param {string} month - The current month being processed (e.g. 'Jan').
 */
export const getAllWeeksForMonth = month => {
  let weeks = [];

  const monthDays = getMonthDays(month);

  let index = 0;
  while (index < monthDays.length) {
    weeks.push(monthDays.slice(index, index + 7));
    index += 7;
  }
  return weeks;
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
  const weeks = getAllWeeksForMonth(month);

  let week = [];

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
 * @param {Array.<Object>} weekRangeArr - Array containing mm/dd/yyyy objects that form a complete week when a single weekday num is clicked.
 * @param {string} day - The selected weekday num.
 */
export const renderWeekHelper = (weekRangeArr, day, month, weekUrl) => {
  let weekJsx = [];
  for (let item of weekRangeArr) {
    // Even though the month argument is the abbreviate month, we need to account
    // for days that belong to neighboring months.
    const abbrMonth = getMonth(item.month);
    if (item.day === day) {
      weekJsx.push(
        <Link
          href="/dashboard/[year]/[month]/[week]/[day]"
          as={`/dashboard/${item.year}/${abbrMonth}/${weekUrl}/${item.day}`}
          key={uuidv4()}
          scroll={false}
        >
          <div className="day-view-weekdays selected-day" key={uuidv4()}>
            {sanitizeDay(item.day)}
            <style jsx>{selectedDayStyles}</style>
          </div>
        </Link>
      );
    } else {
      weekJsx.push(
        <Link
          href="/dashboard/[year]/[month]/[week]/[day]"
          as={`/dashboard/${item.year}/${abbrMonth}/${weekUrl}/${item.day}`}
          key={uuidv4()}
          scroll={false}
        >
          <div className="day-view-weekdays" key={uuidv4()}>
            {sanitizeDay(item.day)}
            <style jsx>{dayViewStyles}</style>
          </div>
        </Link>
      );
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
