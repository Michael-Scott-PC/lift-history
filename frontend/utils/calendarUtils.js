import css from 'styled-jsx/css';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import abbrWeekdays from '../abbr-weekdays.json';
import monthsAndDays from '../months-and-days.json';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

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

export const handleMonthClick = e => {
  const element = document.getElementById(`${e.target.parentNode.id}`);
  console.log(element);
  // TODO: onClick we need to send the element to MonthView
  // and we need to update 'show' to true
};

const weekdayWrapper = () => {
  // wrap each individual abbreviated weekday in a div
  let weekdays = [];

  weekdays.push(
    abbrWeekdays.map(day => (
      <div
        className="abbr-weekdays"
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
`;

const dayWrapper = (item, monthsAndDays) => {
  // wrap each individual day number in a div
  let days = [];
  for (let dayNum of monthsAndDays[item]) {
    const dayId = uuidv4();
    days.push(
      <Fragment key={dayId}>
        <div className="individual-days" onClick={e => handleMonthClick(e)}>
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

export const monthWrapper = () => {
  // wrap each individual month in a div
  let months = [];
  let monthIndex = 0;

  // item is the month name (the keys)
  for (let item in monthsAndDays) {
    months.push(
      <div
        className="month-container col-4"
        key={uuidv4()}
        id={(monthIndex += 1)}
      >
        <h5
          className="month-name text-center"
          onClick={e => handleMonthClick(e)}
        >
          {item}
        </h5>
        {weekdayWrapper()}
        {dayWrapper(item, monthsAndDays)}
        <style jsx>{monthStyles}</style>
      </div>
    );
  }
  return months;
};

const monthStyles = css`
  .month-container {
    display: grid;
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
