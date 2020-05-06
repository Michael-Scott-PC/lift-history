import { Fragment } from 'react';
import css from 'styled-jsx/css';
import { v4 as uuidv4 } from 'uuid';

import {
  currentYear,
  currentHour,
  currentMinute,
  currentSecond,
} from './currentDate';

// This is just for temporary simulation. Users will be able to color code their exercises
// from a list of color choices.
const colors = [
  '#7878ff',
  '#030392',
  '#037892',
  '#03a2c5',
  '#ca0b5b',
  '#219484',
  '#29842c',
  '#b75d00',
];

const programHelper = (program, month, day, classView) => {
  console.log(program);
  const exerciseSchedule = [];

  const monthNum = parseInt(month - 1);
  const dayNum = parseInt(day);

  const createDateObj = new Date(
    currentYear,
    monthNum,
    dayNum,
    currentHour,
    currentMinute,
    currentSecond
  );

  if (program) {
    for (let exerciseObj of program) {
      const convertToDate = new Date(exerciseObj.scheduleExercise);
      if (convertToDate.toDateString() === createDateObj.toDateString()) {
        exerciseObj.exercises.map(exercise =>
          exerciseSchedule.push(
            <div
              className={`${classView} nameOfExercise`}
              style={{
                backgroundColor: `${
                  colors[Math.floor(Math.random() * colors.length)]
                }`,
              }}
              key={uuidv4()}
            >
              {exercise.nameOfExercise}
              <style jsx>{programStyles}</style>
            </div>
          )
        );
      }
    }
  }
  return exerciseSchedule;
};

/**
 * @description: Renders user specific exercises on the corresponding date.
 * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
 * @param {string} month - The selected month, & neighboring months.
 * @param {string} day - The current day. programHelper gets called for every day in a selected month.
 */
export const renderSelectedMonthProgram = (program, month, day) => {
  return <Fragment>{programHelper(program, month, day)}</Fragment>;
};

export const renderSelectedDayProgram = (program, selectedMonth, day) => {
  return (
    <Fragment>
      {programHelper(program, selectedMonth, day, 'program-day-view')}
    </Fragment>
  );
};

const programStyles = css`
  .nameOfExercise {
    width: 100%;
    text-align: center;
    border: 1px solid;
    font-size: calc(1vw);
    min-height: 10px;
    color: #fff;
    align-self: center;
  }
  .program-day-view {
    font-size: 1.25rem;
    border-radius: 8px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;
