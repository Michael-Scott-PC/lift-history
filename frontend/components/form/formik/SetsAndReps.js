// import React, { useEffect, Fragment } from 'react';
// import { Field, FieldArray } from 'formik';
// import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField';

// const SetsAndReps = ({
//   pct,
//   rpe,
//   handleWhichSetsAndReps,
//   isSuperSet,
//   isTripleSet,
// }) => {
//   const result = handleWhichSetsAndReps();
//   const whichSetsAndReps = Object.keys(result);
//   console.log(whichSetsAndReps);

//   const setsAndRepsHelper = () => {
//     const setsArray = [];

//     setsArray.push(
//       ...setsArray,
//       <Fragment>
//         <FieldArray name={whichSetsAndReps}>
//           {({ push, remove, insert }) => (
//             <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
//               {whichSetsAndReps.map((obj, index) => {
//                 const setsName = `${whichSetsAndReps}.${index}.sets`;
//                 const repsName = `${whichSetsAndReps}.${index}.reps`;
//                 const weightName = `${whichSetsAndReps}.${index}.weight`;
//                 const rpeName = `${whichSetsAndReps}.${index}.rpe`;
//                 const pctName = `${whichSetsAndReps}.${index}.pct`;
//                 return (
//                   <div
//                     key={index}
//                     style={{
//                       display: 'grid',
//                       gridGap: '.5rem',
//                       gridTemplateColumns:
//                         rpe || pct
//                           ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
//                           : '.5fr 1.5fr 1.5fr 2fr .5fr',
//                       marginBottom: '1rem',
//                     }}
//                   >
//                     <button
//                       type="button"
//                       className="btn"
//                       onClick={() =>
//                         whichSetsAndReps.length > 1 && remove(index)
//                       }
//                       disabled={isSuperSet || isTripleSet}
//                       style={{
//                         paddingLeft: rpe || pct ? '0' : '6px',
//                         paddingRight: rpe || pct ? '0' : '6px',
//                       }}
//                     >
//                       <img src="removeIcon.svg" alt="remove exercise icon" />
//                     </button>
//                     <Field
//                       type="input"
//                       as={TextField}
//                       name={setsName}
//                       variant="outlined"
//                       label="sets"
//                     />
//                     <Field
//                       type="input"
//                       as={TextField}
//                       name={repsName}
//                       variant="outlined"
//                       label="reps"
//                     />
//                     <Field
//                       type="input"
//                       as={TextField}
//                       name={weightName}
//                       variant="outlined"
//                       label="lbs/kg"
//                     />
//                     {rpe && (
//                       <Field
//                         type="input"
//                         as={TextField}
//                         name={rpeName}
//                         variant="outlined"
//                         label="RPE"
//                       />
//                     )}
//                     {pct && (
//                       <Field
//                         type="input"
//                         as={TextField}
//                         name={pctName}
//                         variant="outlined"
//                         label="%"
//                       />
//                     )}
//                     <button
//                       className="btn"
//                       type="button"
//                       onClick={() =>
//                         insert(index + 1, {
//                           sets: '',
//                           reps: '',
//                           weight: '',
//                         })
//                       }
//                       disabled={isSuperSet || isTripleSet}
//                       style={{
//                         paddingLeft: rpe || pct ? '0' : '6px',
//                         paddingRight: rpe || pct ? '0' : '6px',
//                       }}
//                     >
//                       <img
//                         src="./greenAddIcon.svg"
//                         alt="add exercise icon"
//                         style={{ paddingBottom: '2px' }}
//                       />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </FieldArray>
//       </Fragment>
//     );
//     console.log(setsArray);
//     return setsArray;
//   };

//   return <Fragment>{setsAndRepsHelper()}</Fragment>;
// };

// SetsAndReps.propTypes = {};

// export default SetsAndReps;
