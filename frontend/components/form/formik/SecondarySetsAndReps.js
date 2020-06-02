import React from 'react';
import { Field, FieldArray } from 'formik';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const SecondarySetsAndReps = ({
  secondarySetsAndReps,
  isSuperSet,
  isTripleSet,
  pct,
  rpe,
}) => {
  return (
    <FieldArray name="secondarySetsAndReps">
      {({ push, remove, insert }) => (
        <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
          {secondarySetsAndReps.map((obj, index) => {
            const setsName = `secondarySetsAndReps.${index}.sets`;
            const repsName = `secondarySetsAndReps.${index}.reps`;
            const weightName = `secondarySetsAndReps.${index}.weight`;
            const rpeName = `secondarySetsAndReps.${index}.rpe`;
            const pctName = `secondarySetsAndReps.${index}.pct`;
            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridGap: '.5rem',
                  gridTemplateColumns:
                    rpe || pct
                      ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
                      : '.5fr 1.5fr 1.5fr 2fr .5fr',
                  marginBottom: '1rem',
                }}
              >
                <button
                  type="button"
                  className="btn"
                  onClick={() => remove(index)}
                  disabled={isSuperSet || isTripleSet}
                  style={{
                    paddingLeft: rpe || pct ? '0' : '6px',
                    paddingRight: rpe || pct ? '0' : '6px',
                  }}
                >
                  <img src="removeIcon.svg" alt="remove exercise icon" />
                </button>
                <Field
                  type="input"
                  as={TextField}
                  name={setsName}
                  variant="outlined"
                  label="sets"
                />
                <Field
                  type="input"
                  as={TextField}
                  name={repsName}
                  variant="outlined"
                  label="reps"
                />
                <Field
                  type="input"
                  as={TextField}
                  name={weightName}
                  variant="outlined"
                  label="lbs/kg"
                />
                {rpe && (
                  <Field
                    type="input"
                    as={TextField}
                    name={rpeName}
                    variant="outlined"
                    label="RPE"
                  />
                )}
                {pct && (
                  <Field
                    type="input"
                    as={TextField}
                    name={pctName}
                    variant="outlined"
                    label="%"
                  />
                )}
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    insert(index + 1, {
                      sets: '',
                      reps: '',
                      weight: '',
                    })
                  }
                  disabled={isSuperSet || isTripleSet}
                  style={{
                    paddingLeft: rpe || pct ? '0' : '6px',
                    paddingRight: rpe || pct ? '0' : '6px',
                  }}
                >
                  <img
                    src="./greenAddIcon.svg"
                    alt="add exercise icon"
                    style={{ paddingBottom: '2px' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </FieldArray>
  );
};

SecondarySetsAndReps.propTypes = {
  secondarySetsAndReps: PropTypes.array.isRequired,
  isSuperSet: PropTypes.bool.isRequired,
  isTripleSet: PropTypes.bool.isRequired,
  pct: PropTypes.bool.isRequired,
  rpe: PropTypes.bool.isRequired,
};

export default SecondarySetsAndReps;
