import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray, withFormik } from 'formik';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import TextField from '@material-ui/core/TextField';

import SubmitButton from '../../button/SubmitButton';

import { autoComplete } from '../../../redux/actions/searchActions';
import { handleAddExercise } from '../../../utils/scheduleUtils';

const AddExerciseFormik = ({
  searchReducer: { results },
  values,
  autoComplete,
  showExerciseForm,
  exerciseSelected,
  setValues,
  resetForm,
  setShowExerciseForm,
}) => {
  // For now, in order to persist these values from formik I'm storing them in local state.
  // When I update any part of the form, e.g. selecting an exercise, the form values reset
  // to their defaults, which is not what I want.
  const [secondaryEx, setSecondaryEx] = useState('');
  const [localIsSuperSet, setLocalIsSuperSet] = useState(false);
  const [thirdEx, setThirdEx] = useState('');
  const [localIsTripleSet, setLocalIsTripleSet] = useState(false);
  console.log(localIsTripleSet);

  console.log(values);

  const handleSuperSet = resetForm => {
    setLocalIsSuperSet(!localIsSuperSet);
    setSecondaryEx('');
    resetForm();
  };

  const handleTripleSet = resetForm => {
    setLocalIsTripleSet(!localIsTripleSet);
    setThirdEx('');
    setSecondaryEx('');
    resetForm();
  };

  useEffect(() => {
    if (values.secondaryExercise.length > 0) {
      autoComplete(values.secondaryExercise);
    }
    if (values.thirdExercise.length > 0) {
      autoComplete(values.thirdExercise);
    }
  }, [values.secondaryExercise, values.thirdExercise]);

  return (
    <Form
      style={{
        display: showExerciseForm ? 'grid' : 'none',
        gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
      }}
    >
      {/* Date & Time section */}
      <Field
        as={FormCheck}
        type="checkbox"
        name="time"
        label="Include time"
        style={{ gridColumn: '1 / 13', marginTop: '2rem' }}
      />
      <Field
        as={TextField}
        type="date"
        name="pickDate"
        style={{
          marginTop: '1rem',
          marginBottom: '2rem',
          gridColumn: values.time ? '1 / 7' : '1 / 13',
        }}
        label="Pick a date:"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {values.time && (
        <Field
          as={TextField}
          type="time"
          name="time"
          label="Time:"
          style={{ gridColumn: '8 / 13', marginTop: '1rem' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}

      {/* Optional form check boxes: RPE, pct, super set, triple set */}
      <FormCheckLabel style={{ gridColumn: '1 / 4' }}>Optional:</FormCheckLabel>
      <Field
        as={FormCheck}
        name="rpe"
        label="RPE"
        // onClick={() => setRpe(!rpe)}
        disabled={values.pct}
      />
      <Field
        as={FormCheck}
        name="pct"
        label="%"
        // onClick={() => setPct(!pct)}
        disabled={values.rpe}
        style={{ gridColumn: ' 9/ 13 ' }}
      />
      {/* Might not need this FieldArray element if I'm not going to pass push and remove
            helpers to handlers
      */}
      <FieldArray name="secondarySetsAndReps">
        {({ push, remove }) => (
          <Fragment>
            <Field
              name="isSuperSet"
              as={FormCheck}
              label="Super Set?"
              //   onClick={() => handleSuperSet(push, remove)}
              //   onClick={() => console.log(values.isSuperSet)}
              onClick={() => handleSuperSet(resetForm)}
              disabled={values.isTripleSet}
              style={{ gridColumn: '4 / 8' }}
            />
            <Field
              name="isTripleSet"
              as={FormCheck}
              label="Triple Set?"
              onClick={() => handleTripleSet(resetForm)}
              disabled={values.isSuperSet}
              style={{ gridColumn: '9 / 13' }}
            />
          </Fragment>
        )}
      </FieldArray>

      {/* Displays primary exercise name */}
      {exerciseSelected && (
        <Field
          name="primaryExercise"
          value={(values.primaryExercise = exerciseSelected)}
          readOnly
          style={{
            gridColumn: '1 / 13',
            marginTop: '1.5rem',
            marginBottom: '1rem',
            fontSize: '1.5rem',
          }}
        />
      )}

      {/* Displays primary exercise sets and reps */}
      <FieldArray name="primarySetsAndReps">
        {({ push, remove, insert }) => (
          <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
            {values.primarySetsAndReps.map((obj, index) => {
              const setsName = `primarySetsAndReps.${index}.sets`;
              const repsName = `primarySetsAndReps.${index}.reps`;
              const weightName = `primarySetsAndReps.${index}.weight`;
              const rpeName = `primarySetsAndReps.${index}.rpe`;
              const pctName = `primarySetsAndReps.${index}.pct`;
              return (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridGap: '.5rem',
                    gridTemplateColumns:
                      values.rpe || values.pct
                        ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
                        : '.5fr 1.5fr 1.5fr 2fr .5fr',
                    marginBottom: '1rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      values.primarySetsAndReps.length > 1 && remove(index)
                    }
                    disabled={values.isSuperSet || values.isTripleSet}
                    style={{
                      paddingLeft: values.rpe || values.pct ? '0' : '6px',
                      paddingRight: values.rpe || values.pct ? '0' : '6px',
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
                  {values.rpe && (
                    <Field
                      type="input"
                      as={TextField}
                      name={rpeName}
                      variant="outlined"
                      label="RPE"
                    />
                  )}
                  {values.pct && (
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
                    disabled={values.isSuperSet || values.isTripleSet}
                    style={{
                      paddingLeft: values.rpe || values.pct ? '0' : '6px',
                      paddingRight: values.rpe || values.pct ? '0' : '6px',
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

      {/* Displays search bar for secondary exercise */}
      {(localIsSuperSet || localIsTripleSet) && !secondaryEx && (
        <Fragment>
          <Field
            name="secondaryExercise"
            style={{
              gridColumn: '1 / 13',
              border: '1px solid grey',
              marginBottom: '1rem',
            }}
            placeholder="select second exercise"
          />
        </Fragment>
      )}

      {/* Displays autocomplete list for secondary exercise */}
      {results && values.secondaryExercise.length > 0 && !secondaryEx && (
        <ul>
          {results.map(exercise => (
            <Fragment key={exercise}>
              <li
                onClick={() => setValues({ secondaryExercise: `${exercise}` })}
              >
                {exercise}
              </li>
              <img
                src="./greenAddIcon.svg"
                alt="green add icon"
                id="add-exercise-icon"
                onClick={() =>
                  handleAddExercise(
                    exercise,
                    setValues,
                    setSecondaryEx,
                    setShowExerciseForm,
                    resetForm
                  )
                }
              />
              <img
                src="./autoCompleteArrow.svg"
                alt="autocomplete arrow"
                id="auto-complete-arrow"
                onClick={() => setValues({ secondaryExercise: `${exercise}` })}
              />
            </Fragment>
          ))}
          <style jsx>{`
            ul {
              list-style: none;
              border: 1px solid rgba(0, 0, 0, 0.25);
              padding-left: 1.5rem;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
              box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
              display: grid;
              grid-column: 1 / 13;
              grid-template-columns: 8fr 1fr 1fr;
              padding-top: 0.5rem;
            }
            li {
              margin-bottom: 0.25rem;
            }
            #auto-complete-arrow {
              align-self: center;
              margin-bottom: 0.25rem;
            }
          `}</style>
        </ul>
      )}

      {/* Displays secondary exercise name */}
      {(localIsSuperSet || localIsTripleSet) && secondaryEx && (
        <Field
          name="secondaryEx"
          value={(values.secondaryExercise = secondaryEx)}
          readOnly
          style={{
            gridColumn: '1 / 13',
            marginTop: '1.5rem',
            marginBottom: '1rem',
            fontSize: '1.5rem',
          }}
        />
      )}

      {/* Displays sets and reps for secondary exercise */}
      {(localIsSuperSet || localIsTripleSet) && (
        <FieldArray name="secondarySetsAndReps">
          {({ push, remove, insert }) => (
            <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
              {values.secondarySetsAndReps.map((obj, index) => {
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
                        values.rpe || values.pct
                          ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
                          : '.5fr 1.5fr 1.5fr 2fr .5fr',
                      marginBottom: '1rem',
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => remove(index)}
                      disabled={values.isSuperSet || values.isTripleSet}
                      style={{
                        paddingLeft: values.rpe || values.pct ? '0' : '6px',
                        paddingRight: values.rpe || values.pct ? '0' : '6px',
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
                    {values.rpe && (
                      <Field
                        type="input"
                        as={TextField}
                        name={rpeName}
                        variant="outlined"
                        label="RPE"
                      />
                    )}
                    {values.pct && (
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
                      disabled={values.isSuperSet || values.isTripleSet}
                      style={{
                        paddingLeft: values.rpe || values.pct ? '0' : '6px',
                        paddingRight: values.rpe || values.pct ? '0' : '6px',
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
      )}

      {/* Displays search bar for third exercise  */}
      {localIsTripleSet && !thirdEx && (
        <Fragment>
          <Field
            name="thirdExercise"
            style={{
              gridColumn: '1 / 13',
              border: '1px solid grey',
              marginBottom: '1rem',
            }}
            placeholder="select third exercise"
          />
        </Fragment>
      )}

      {/* Displays autocomplete results for third exercise search bar */}
      {results && values.thirdExercise.length > 0 && !thirdEx && (
        <ul>
          {results.map(exercise => (
            <Fragment key={exercise}>
              <li onClick={() => setValues({ thirdExercise: `${exercise}` })}>
                {exercise}
              </li>
              <img
                src="./greenAddIcon.svg"
                alt="green add icon"
                id="add-exercise-icon"
                onClick={() =>
                  handleAddExercise(
                    exercise,
                    setValues,
                    setThirdEx,
                    setShowExerciseForm,
                    resetForm
                  )
                }
              />
              <img
                src="./autoCompleteArrow.svg"
                alt="autocomplete arrow"
                id="auto-complete-arrow"
                onClick={() => setValues({ thirdExercise: `${exercise}` })}
              />
            </Fragment>
          ))}
          <style jsx>{`
            ul {
              list-style: none;
              border: 1px solid rgba(0, 0, 0, 0.25);
              padding-left: 1.5rem;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
              box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
              display: grid;
              grid-column: 1 / 13;
              grid-template-columns: 8fr 1fr 1fr;
              padding-top: 0.5rem;
            }
            li {
              margin-bottom: 0.25rem;
            }
            #auto-complete-arrow {
              align-self: center;
              margin-bottom: 0.25rem;
            }
          `}</style>
        </ul>
      )}

      {/* Display Third Exercise name */}
      {thirdEx && (
        <Field
          name="thirdEx"
          value={(values.thirdExercise = thirdEx)}
          readOnly
          style={{
            gridColumn: '1 / 13',
            marginTop: '1.5rem',
            marginBottom: '1rem',
            fontSize: '1.5rem',
          }}
        />
      )}

      {/* Displays sets and reps for third exercise */}
      {localIsTripleSet && (
        <FieldArray name="thirdSetsAndReps">
          {({ push, remove, insert }) => (
            <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
              {values.thirdSetsAndReps.map((obj, index) => {
                const setsName = `thirdSetsAndReps.${index}.sets`;
                const repsName = `thirdSetsAndReps.${index}.reps`;
                const weightName = `thirdSetsAndReps.${index}.weight`;
                const rpeName = `thirdSetsAndReps.${index}.rpe`;
                const pctName = `thirdSetsAndReps.${index}.pct`;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridGap: '.5rem',
                      gridTemplateColumns:
                        values.rpe || values.pct
                          ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
                          : '.5fr 1.5fr 1.5fr 2fr .5fr',
                      marginBottom: '1rem',
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => remove(index)}
                      disabled={values.isSuperSet || values.isTripleSet}
                      style={{
                        paddingLeft: values.rpe || values.pct ? '0' : '6px',
                        paddingRight: values.rpe || values.pct ? '0' : '6px',
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
                    {values.rpe && (
                      <Field
                        type="input"
                        as={TextField}
                        name={rpeName}
                        variant="outlined"
                        label="RPE"
                      />
                    )}
                    {values.pct && (
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
                      disabled={values.isSuperSet || values.isTripleSet}
                      style={{
                        paddingLeft: values.rpe || values.pct ? '0' : '6px',
                        paddingRight: values.rpe || values.pct ? '0' : '6px',
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
      )}

      <div className="btn-container" style={{ gridColumn: '1 / 13' }}>
        <SubmitButton />
      </div>
    </Form>
  );
};

const FormikComp = withFormik({
  mapPropsToValues() {
    return {
      primaryExercise: '',
      secondaryExercise: '',
      thirdExercise: '',
      pickDate: '',
      time: false,
      isSuperSet: false,
      isTripleSet: false,
      isWarmup: false,
      isWorkingSet: false,
      rpe: false,
      pct: false,
      primarySetsAndReps: [
        { sets: '', reps: '', weight: '', rpe: '', pct: '' },
      ],
      secondarySetsAndReps: [
        { sets: '', reps: '', weight: '', rpe: '', pct: '' },
      ],
      thirdSetsAndReps: [{ sets: '', reps: '', weight: '', rpe: '', pct: '' }],
    };
  },
})(AddExerciseFormik);

AddExerciseFormik.propTypes = {};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

// export default AddExerciseFormik
export default connect(mapStateToProps, { autoComplete })(FormikComp);
