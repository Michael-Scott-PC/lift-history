import css from 'styled-jsx/css';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import {
  currentYear,
  currentHour,
  currentMinute,
  currentSecond,
} from './currentDate';

import { getMonthIndex } from './calendarUtils';

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

/**
 * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
 * @param {string} month - The selected month, & neighboring months.
 * @param {string} day - The current day. programHelper gets called for every day in a selected month.
 * @param {string} classView - The view depending on calendar view.
 */
let count = 0;
const programHelper = (program, month, day, classView, dataSWR) => {
  // console.log('dataSWR programHelper: ', dataSWR);
  count = count + 1;
  // console.log(count);
  const exerciseSchedule = [];

  const monthNum = parseInt(month - 1);

  let monthId;
  if (isNaN(monthNum)) {
    const monthIndex = getMonthIndex(month);
    monthId = parseInt(monthIndex - 1);
  }

  const dayNum = parseInt(day);

  const createDateObj = new Date(
    currentYear,
    monthNum ? monthNum : monthId,
    dayNum,
    currentHour,
    currentMinute,
    currentSecond
  );

  let dataSource;
  if ((dataSource = dataSWR ? dataSWR : program)) {
    // console.log('dataSource from scheduleUtils.js: ', dataSource);
    for (let programObj of dataSource) {
      const convertToDate = new Date(programObj.scheduleExercise);
      if (convertToDate.toDateString() === createDateObj.toDateString()) {
        // TODO: render a different UI for super sets and triple sets.
        if (programObj.isSuperSet || programObj.isTripleSet) {
        }
        programObj.thisDaysExercises.map(exerciseObj => {
          // console.log('exerciseObj: ', exerciseObj);
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
              {exerciseObj.exercise.nameOfExercise}
              <style jsx>{programStyles}</style>
            </div>
          );
        });
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
export const renderSelectedMonthProgram = (program, month, day, dataSWR) => {
  // console.log('renderSelectedMonthProgram dataSWR: ', dataSWR);
  return (
    <Fragment>
      {programHelper(program, month, day, 'program-month-view', dataSWR)}
    </Fragment>
  );
};

/**
 *
 * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
 * @param {string} selectedMonth - The user selected month.
 * @param {string} day - The current day. programHelper gets called for every day in a selected month.
 */
export const renderSelectedDayProgram = (
  program,
  selectedMonth,
  day,
  classView
) => {
  return (
    <Fragment>{programHelper(program, selectedMonth, day, classView)}</Fragment>
  );
};

const programStyles = css`
  .nameOfExercise {
    width: 100%;
    text-align: center;
    /* border: 1px solid; */
    font-size: calc(1vw);
    min-height: 10px;
    color: #fff;
    align-self: center;
    margin-bottom: 1.5px;
    border-radius: 2px;
  }
  /* .nameOfExercise.program-day-view {
    font-size: calc(1vw);
  } */
  .program-day-view {
    font-size: 1.25rem;
    border-radius: 8px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0px 2px 2px 2px #00000026;
  }
  .nameOfExercise.program-week-view {
    font-size: calc(2vw);
  }
`;

export const handleAddExercise = (
  exercise,
  setValues,
  setExercise,
  setShowExerciseForm,
  resetForm
) => {
  setValues({ searchTerm: `${exercise}` });
  setExercise(exercise);
  setShowExerciseForm(true);
  resetForm(true);
};
