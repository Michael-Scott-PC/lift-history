import React, { Fragment } from 'react';
import css from 'styled-jsx/css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Typography from '@material-ui/core/Typography';

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

export const programHelper = (
  program,
  month,
  day,
  classView,
  dataSWR,
  profile
) => {
  // color_code_exercises is an array of objects.
  // console.log('programHelper profile: ', profile);
  const { color_code_exercises } = profile;
  // console.log('programHelper program: ', program);
  // console.log('programHelper color_code_exercises: ', color_code_exercises);
  // console.log('programHelper dataSWR: ', dataSWR);
  // console.log('programHelper classView: ', classView);

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
    console.log('dataSource from scheduleUtils.js: ', dataSource);
    for (let programObj of dataSource) {
      const convertToDate = new Date(programObj.scheduleExercise);
      if (convertToDate.toDateString() === createDateObj.toDateString()) {
        // TODO: render a different UI for super sets and triple sets.
        if (programObj.isSuperSet || programObj.isTripleSet) {
        }
        programObj.thisDaysExercises.map(exerciseObj => {
          // console.log('exerciseObj: ', exerciseObj);
          exerciseSchedule.push(
            <Accordion
              key={uuidv4()}
              style={
                classView === 'program-day-view'
                  ? accordionDayStyle
                  : accordionStyle
              }
            >
              <Card
                style={{
                  backgroundColor:
                    exerciseObj.color && `#${exerciseObj.color.color}`,
                }}
              >
                <Card.Header style={cardHeaderStyle}>
                  <Accordion.Toggle
                    style={
                      classView === 'program-day-view' ? btnDayStyle : btnStyle
                    }
                    eventKey="0"
                    as={classView === 'program-month-view' ? 'div' : 'button'}
                  >
                    {exerciseObj.exercise.nameOfExercise}
                  </Accordion.Toggle>
                </Card.Header>
                {classView == 'program-day-view' && (
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>THE BODY</Card.Body>
                  </Accordion.Collapse>
                )}
              </Card>
            </Accordion>
          );
        });
      }
    }
  }
  return exerciseSchedule;
};

const accordionStyle = {
  display: 'grid',
  textAlign: 'center',
};

const accordionDayStyle = {
  border: '1px solid #808080',
  textAlign: 'center',
};

// const cardStyle = {
//   alignItems: 'center',
//   border: 'none',
// };

const cardHeaderStyle = {
  display: 'contents',
  fontSize: 'calc(2vw)',
  // color: '#fff',
};

const btnStyle = {
  color: 'blue',
  border: 'none',
  // color: '#fff',
};

const btnDayStyle = {
  width: '100%',
  height: '100%',
  padding: '.5rem',
  fontSize: 'calc(2.5vh)',
};

const programStyles = css`
  .nameOfExercise {
    width: 100%;
    text-align: center;
    font-size: calc(1vw);
    min-height: 10px;
    color: #fff;
    align-self: center;
    margin-bottom: 1.5px;
    border-radius: 2px;
  }
  .nameOfExercise.program-day-view {
    font-size: calc(5vw);
  }
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

// export const handleAddExercise = (
//   exercise,
//   setValues,
//   setExercise,
//   setShowExerciseForm,
//   resetForm
// ) => {
//   setValues({ searchTerm: `${exercise}` });
//   setExercise(exercise);
//   setShowExerciseForm(true);
//   resetForm(true);
// };

export const handleAddExercise = (
  whichValue,
  exerciseObj,
  setFieldValue,
  setShowExerciseForm
) => {
  setFieldValue(`${whichValue}`, exerciseObj);
  setFieldValue('searchTerm', '');
  setShowExerciseForm(true);
};
