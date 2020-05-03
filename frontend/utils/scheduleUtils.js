import css from 'styled-jsx/css';
import { v4 as uuidv4 } from 'uuid';

export const programHelper = (program, currentYear, month, day) => {
  const exerciseSchedule = [];
  const createDateObj = new Date(`${currentYear}-${month}-${day}`);

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
