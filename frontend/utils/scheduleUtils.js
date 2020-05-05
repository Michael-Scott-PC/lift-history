import css from 'styled-jsx/css';
import { v4 as uuidv4 } from 'uuid';

import { currentHour, currentMinute, currentSecond } from './currentDate';

/**
 * @description: Renders user specific exercises on the corresponding date.
 * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
 * @param {number} currentYear - The current year.
 * @param {string} month - The selected month, & neighboring months.
 * @param {string} day - The current day. programHelper gets called for every day in a selected month.
 */
export const programHelper = (program, currentYear, month, day) => {
  const exerciseSchedule = [];
  const createDateObj = new Date(
    `${currentYear}-${month}-${day}T${currentHour}:${currentMinute}:${currentSecond}`
  );

  if (program) {
    for (let day of program) {
      const convertToDate = new Date(day.scheduleExercise);
      if (convertToDate.toDateString() === createDateObj.toDateString()) {
        day.exercises.map(exercise =>
          exerciseSchedule.push(
            <div className="nameOfExercise" key={uuidv4()}>
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

const programStyles = css`
  .nameOfExercise {
    width: 100%;
    text-align: center;
    border: 1px solid;
    font-size: calc(1vw);
    min-height: 10px;
  }
`;
