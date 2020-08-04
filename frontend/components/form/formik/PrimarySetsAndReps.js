import React, { Fragment, useState } from 'react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import SetsAndReps from './SetsAndReps';

const PrimarySetsAndReps = ({
  pct,
  rpe,
  primarySetsAndReps,
  values,
  setLocalPrimarySetsAndReps,
}) => {
  // console.log('values: ', values);
  // console.log('primarySetsAndReps: ', primarySetsAndReps);
  // const [localSets, setLocalSets] = useState('');
  // const [localReps, setLocalReps] = useState('');
  // const [localWeight, setLocalWeight] = useState('');
  // const [localPrimarySetsAndReps, setLocalPrimarySetsAndReps] = useState([]);
  // console.log('localPrimarySetsAndReps: ', localPrimarySetsAndReps);

  // const handleChangeValue = () => {}

  React.useEffect(() => {
    setLocalPrimarySetsAndReps(primarySetsAndReps);
  }, [primarySetsAndReps]);

  return (
    <Fragment>
      <FieldArray name="primarySetsAndReps">
        {({ push, remove, insert }) => (
          <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
            {primarySetsAndReps.map((obj, index) => {
              const setsName = `primarySetsAndReps.${index}.sets`;
              const repsName = `primarySetsAndReps.${index}.reps`;
              const weightName = `primarySetsAndReps.${index}.weight`;
              const rpeName = `primarySetsAndReps.${index}.rpe`;
              const pctName = `primarySetsAndReps.${index}.pct`;
              return (
                <SetsAndReps
                  remove={remove}
                  insert={insert}
                  index={index}
                  setsName={setsName}
                  repsName={repsName}
                  weightName={weightName}
                  rpeName={rpeName}
                  pctName={pctName}
                  values={values}
                  primarySetsAndReps={primarySetsAndReps}
                  rpe={rpe}
                  pct={pct}
                  key={index}
                />
                // <div
                //   key={index}
                //   style={{
                //     display: 'grid',
                //     gridGap: '.5rem',
                //     gridTemplateColumns:
                //       rpe || pct
                //         ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
                //         : '.5fr 1.5fr 1.5fr 2fr .5fr',
                //     marginBottom: '1rem',
                //   }}
                // >
                //   <button
                //     type="button"
                //     className="btn"
                //     onClick={() =>
                //       primarySetsAndReps.length > 1 && remove(index)
                //     }
                //     style={{
                //       paddingLeft: rpe || pct ? '0' : '6px',
                //       paddingRight: rpe || pct ? '0' : '6px',
                //     }}
                //   >
                //     <img src="/removeIcon.svg" alt="remove exercise icon" />
                //   </button>
                //   <Field
                //     type="input"
                //     as={TextField}
                //     name={setsName}
                //     value={values.primarySetsAndReps[index].sets}
                //     variant="outlined"
                //     label="sets"
                //   />
                //   <Field
                //     type="input"
                //     as={TextField}
                //     name={repsName}
                //     value={values.primarySetsAndReps[index].reps}
                //     variant="outlined"
                //     label="reps"
                //   />
                //   <Field
                //     type="input"
                //     as={TextField}
                //     name={weightName}
                //     value={values.primarySetsAndReps[index].weight}
                //     variant="outlined"
                //     label="lbs/kg"
                //   />
                //   {rpe && (
                //     <Field
                //       type="input"
                //       as={TextField}
                //       name={rpeName}
                //       variant="outlined"
                //       label="RPE"
                //     />
                //   )}
                //   {pct && (
                //     <Field
                //       type="input"
                //       as={TextField}
                //       name={pctName}
                //       variant="outlined"
                //       label="%"
                //     />
                //   )}
                //   <button
                //     className="btn"
                //     type="button"
                //     onClick={() =>
                //       insert(index + 1, {
                //         sets: '',
                //         reps: '',
                //         weight: '',
                //       })
                //     }
                //     style={{
                //       paddingLeft: rpe || pct ? '0' : '6px',
                //       paddingRight: rpe || pct ? '0' : '6px',
                //     }}
                //   >
                //     <img
                //       src="/greenAddIcon.svg"
                //       alt="add exercise icon"
                //       style={{ paddingBottom: '2px' }}
                //     />
                //   </button>
                // </div>
              );
            })}
          </div>
        )}
      </FieldArray>
    </Fragment>
  );
};

PrimarySetsAndReps.propTypes = {
  pct: PropTypes.bool.isRequired,
  rpe: PropTypes.bool.isRequired,
  primarySetsAndReps: PropTypes.array.isRequired,
  isSuperSet: PropTypes.bool.isRequired,
  isTripleSet: PropTypes.bool.isRequired,
};

export default PrimarySetsAndReps;
