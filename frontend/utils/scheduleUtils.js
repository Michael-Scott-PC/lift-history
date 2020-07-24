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

export const programHelper = (program, month, day, classView, dataSWR) => {
  // console.log('dataSWR programHelper: ', dataSWR);
  console.log('classView: ', classView);
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
            <Accordion
              key={uuidv4()}
              style={
                classView === 'program-day-view'
                  ? accordionDayStyle
                  : accordionStyle
              }
            >
              <Card style={cardStyle}>
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
};

const accordionDayStyle = {
  border: '1px solid #808080',
};

const cardStyle = {
  alignItems: 'center',
  border: 'none',
};

const cardHeaderStyle = {
  display: 'contents',
  fontSize: 'calc(2vw)',
};

const btnStyle = {
  color: 'blue',
  border: 'none',
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

{
  /* <div
              className={`${classView} nameOfExercise`}
              style={{
                backgroundColor: `${
                  colors[Math.floor(Math.random() * colors.length)]
                }`,
              }}
              key={uuidv4()}
            >
              
              <style jsx>{programStyles}</style>
            </div> */
}

/**
 * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
 * @param {string} month - The selected month, & neighboring months.
 * @param {string} day - The current day. programHelper gets called for every day in a selected month.
 * @param {string} classView - The view depending on calendar view.
 */
let count = 0;

// /**
//  * @description: Renders user specific exercises on the corresponding date.
//  * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
//  * @param {string} month - The selected month, & neighboring months.
//  * @param {string} day - The current day. programHelper gets called for every day in a selected month.
//  */
// export const renderSelectedMonthProgram = (
//   program,
//   month,
//   day,
//   classView,
//   dataSWR
// ) => {
//   // console.log('renderSelectedMonth ran.');
//   return (
//     <Fragment>
//       {programHelper(program, month, day, classView, dataSWR)}
//     </Fragment>
//   );
// };

// /**
//  *
//  * @param {Array.<object>} program - A list of exercise objects, grouped by exercises on the same date.
//  * @param {string} selectedMonth - The user selected month.
//  * @param {string} day - The current day. programHelper gets called for every day in a selected month.
//  */
// export const renderSelectedDayProgram = (
//   program,
//   selectedMonth,
//   day,
//   classView,
//   dataSWR
//   // programDayView,
//   // nameOfExercise
// ) => {
//   return (
//     <Fragment>
//       {programHelper(
//         program,
//         selectedMonth,
//         day,
//         classView,
//         dataSWR
//         // programDayView,
//         // nameOfExercise
//       )}
//     </Fragment>
//   );
// };

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

// const CustomCard = withStyles({
//   root: {
//     width: '100%',
//     textAlign: 'center',
//     minHeight: '10px',
//     color: '#fff',
//     alignSelf: 'center',
//     marginBottom: '1.5px',
//     borderRadius: '2px',
//   },
// })(Card);

// const CustomCardHeader = withStyles({
//   root: {
//     width: '100%',
//     fontSize: 'calc(1vw)',
//     padding: '3px',
//   },
//   title: {
//     fontSize: 'calc(1vw)',
//   },
// })(CardHeader);

// const programHelper = (
//   program,
//   month,
//   day,
//   classView,
//   dataSWR,
//   programDayView,
//   nameOfExercise
// ) => {
//   console.log('classView programHelper: ', classView);
//   // console.log('dataSWR programHelper: ', dataSWR);
//   // count = count + 1;
//   // console.log(count);
//   const exerciseSchedule = [];

//   const monthNum = parseInt(month - 1);

//   let monthId;
//   if (isNaN(monthNum)) {
//     const monthIndex = getMonthIndex(month);
//     monthId = parseInt(monthIndex - 1);
//   }

//   const dayNum = parseInt(day);

//   const createDateObj = new Date(
//     currentYear,
//     monthNum ? monthNum : monthId,
//     dayNum,
//     currentHour,
//     currentMinute,
//     currentSecond
//   );

//   let dataSource;
//   if ((dataSource = dataSWR ? dataSWR : program)) {
//     // console.log('dataSource from scheduleUtils.js: ', dataSource);
//     for (let programObj of dataSource) {
//       // console.log('programObj: ', programObj);
//       const convertToDate = new Date(programObj.scheduleExercise);
//       if (convertToDate.toDateString() === createDateObj.toDateString()) {
//         // TODO: render a different UI for super sets and triple sets.
//         // if (programObj.isSuperSet || programObj.isTripleSet) {
//         // }
//         programObj.thisDaysExercises.map(exerciseObj => {
//           // let isExpanded;
//           // let setExpandedHelper;
//           if (classView === 'programDayView') {
//             const [expanded, setExpanded] = React.useState(false);
//             // isExpanded = expanded;
//             // setExpandedHelper = setExpanded;
//             const handleExpandClick = () => {
//               // setExpandedHelper(!isExpanded);
//               // setExpandedHelper(!expanded);
//               setExpanded(!expanded);
//             };

//             exerciseSchedule.push(
//               <CustomCard
//                 key={uuidv4()}
//                 className={`${programDayView} ${nameOfExercise}`}
//                 style={{
//                   backgroundColor: `${
//                     colors[Math.floor(Math.random() * colors.length)]
//                   }`,
//                 }}
//                 onClick={handleExpandClick}
//                 aria-expanded={expanded}
//                 aria-label="show more"
//               >
//                 <CustomCardHeader
//                   className={`${programDayView} ${nameOfExercise}`}
//                   title={exerciseObj.exercise.nameOfExercise}
//                 />
//                 <Collapse in={expanded} unmountOnExit>
//                   <CardContent>
//                     {exerciseObj.thisSetsAndReps.map(set => (
//                       <Fragment key={uuidv4()}>
//                         <div>{set.sets}</div>
//                         <div>{set.reps}</div>
//                         <div>{set.weight}</div>
//                         <div>{set.rpe}</div>
//                         <div>{set.pct}</div>
//                         <div>{set.toFailure}</div>
//                         <div>{set.isWarmup}</div>
//                       </Fragment>
//                     ))}
//                   </CardContent>
//                 </Collapse>
//               </CustomCard>
//             );
//           } else {
//             exerciseSchedule.push(
//               <CustomCard
//                 key={uuidv4()}
//                 className={`${programDayView} ${nameOfExercise}`}
//                 style={{
//                   backgroundColor: `${
//                     colors[Math.floor(Math.random() * colors.length)]
//                   }`,
//                 }}
//               >
//                 <CustomCardHeader
//                   className={`${programDayView} ${nameOfExercise}`}
//                   title={exerciseObj.exercise.nameOfExercise}
//                 />
//               </CustomCard>
//             );
//           }
//         });
//       }
//     }
//   }
//   return exerciseSchedule;
// };

// const CustomCard = withStyles({
//   root: {
//     color: 'yellow',
//     width: '100%',
//   },
// })(Card);

// const CustomCardHeader = withStyles({
//   root: {
//     width: '100%',
//     fontSize: 'calc(1vw)',
//     padding: '3px',
//   },
//   title: {
//     fontSize: 'calc(1vw)',
//   },
// })(CardHeader);

// export const useStyles = makeStyles({
//   nameOfExercise: {
//     width: props => console.log(props),
//     textAlign: 'center',
//     minHeight: '10px',
//     color: '#fff',
//     alignSelf: 'center',
//     marginBottom: '1.5px',
//     borderRadius: '2px',
//   },
//   programDayView: {
//     fontSize: '1.25rem',
//     borderRadius: '8px',
//     paddingTop: '0.5rem',
//     paddingBottom: '0.5rem',
//     boxShadow: '0px 2px 2px 2px #00000026',
//   },
// });
