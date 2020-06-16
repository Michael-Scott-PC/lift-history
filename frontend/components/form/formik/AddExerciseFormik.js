import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';

import DateAndTime from './DateAndTime';
import Options from './Options';
import PrimaryExercise from './PrimaryExercise';
import PrimarySetsAndReps from './PrimarySetsAndReps';
import SecondaryExSearchBar from './SecondaryExSearchBar';
import SecondaryExName from './SecondaryExName';
import SecondaryAutoCompleteList from './SecondaryAutoCompleteList';
import SecondarySetsAndReps from './SecondarySetsAndReps';
import SubmitButton from '../../button/SubmitButton';
import ThirdExSearchBar from './ThirdExSearchBar';
import ThirdAutoComplete from './ThirdAutoComplete';
import ThirdExName from './ThirdExName';

import { autoComplete } from '../../../redux/actions/searchActions';
import { createUserProgram } from '../../../redux/actions/programActions';
import ThirdSetsAndReps from './ThirdSetsAndReps';

const AddExerciseFormik = ({
  searchReducer: { results },
  authReducer: { id, jwt },
  programReducer,
  values,
  autoComplete,
  showExerciseForm,
  exerciseSelected,
  setExercise,
  setValues,
  setFieldValue,
  handleSubmit,
  handleChange,
  resetForm,
  setShowExerciseForm,
  createUserProgram,
  setLocalPickDate,
  localPickDate,
  setShowAddExModal,
}) => {
  // For now, in order to persist these values from formik I'm storing them in local state.
  // When I update any part of the form, e.g. selecting an exercise, the form values reset
  // to their defaults, which is not what I want.
  const [secondaryEx, setSecondaryEx] = useState('');
  const [localIsSuperSet, setLocalIsSuperSet] = useState(false);
  const [thirdEx, setThirdEx] = useState('');
  const [localIsTripleSet, setLocalIsTripleSet] = useState(false);

  const {
    primaryExercise,
    secondaryExercise,
    thirdExercise,
    pickDate,
    time,
    isSuperSet,
    isTripleSet,
    isWarmup,
    isWorkingSet,
    rpe,
    pct,
    primarySetsAndReps,
    secondarySetsAndReps,
    thirdSetsAndReps,
  } = values;

  return (
    <Fragment>
      {exerciseSelected && (
        <Form
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: showExerciseForm ? 'grid' : 'none',
            gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
          }}
        >
          {/* Date & Time section */}
          <DateAndTime
            time={time}
            values={values}
            setLocalPickDate={setLocalPickDate}
          />

          {/* Optional form check boxes: RPE, pct, super set, triple set */}
          <Options
            pct={pct}
            rpe={rpe}
            values={values}
            setLocalIsSuperSet={setLocalIsSuperSet}
            setLocalIsTripleSet={setLocalIsTripleSet}
            localIsSuperSet={localIsSuperSet}
            localIsTripleSet={localIsTripleSet}
            setSecondaryEx={setSecondaryEx}
            setThirdEx={setThirdEx}
            resetForm={resetForm}
          />

          {/* Displays primary exercise name */}
          <PrimaryExercise
            values={values}
            exerciseSelected={exerciseSelected}
            setExercise={setExercise}
            setFieldValue={setFieldValue}
          />

          {/* Displays primary exercise sets and reps */}
          <PrimarySetsAndReps
            pct={pct}
            rpe={rpe}
            primarySetsAndReps={primarySetsAndReps}
            isSuperSet={isSuperSet}
            isTripleSet={isTripleSet}
          />

          {/* Displays search bar for secondary exercise */}
          {(localIsSuperSet || localIsTripleSet) && !secondaryEx && (
            <SecondaryExSearchBar />
          )}

          {/* Displays autocomplete list for secondary exercise */}
          {(localIsSuperSet || localIsTripleSet) &&
            results &&
            secondaryExercise.length > 0 &&
            !secondaryEx && (
              <SecondaryAutoCompleteList
                setFieldValue={setFieldValue}
                secondaryExercise={secondaryExercise}
                setValues={setValues}
                setSecondaryEx={setSecondaryEx}
                resetForm={resetForm}
                setShowExerciseForm={setShowExerciseForm}
              />
            )}

          {/* Displays secondary exercise name */}
          {(localIsSuperSet || localIsTripleSet) && secondaryEx && (
            <SecondaryExName secondaryEx={secondaryEx} values={values} />
          )}

          {/* Displays sets and reps for secondary exercise */}
          {(localIsSuperSet || localIsTripleSet) && (
            <SecondarySetsAndReps
              secondarySetsAndReps={secondarySetsAndReps}
              isSuperSet={isSuperSet}
              isTripleSet={isTripleSet}
              pct={pct}
              rpe={rpe}
            />
          )}

          {/* Displays search bar for third exercise  */}
          {localIsTripleSet && !thirdEx && <ThirdExSearchBar />}

          {/* Displays autocomplete results for third exercise search bar */}
          {results && thirdExercise.length > 0 && !thirdEx && results && (
            <ThirdAutoComplete
              setValues={setValues}
              setThirdEx={setThirdEx}
              setShowExerciseForm={setShowExerciseForm}
              resetForm={resetForm}
              thirdExercise={thirdExercise}
              setFieldValue={setFieldValue}
            />
          )}

          {/* Display Third Exercise name */}
          {thirdEx && <ThirdExName thirdEx={thirdEx} values={values} />}

          {/* Displays sets and reps for third exercise */}
          {localIsTripleSet && (
            <ThirdSetsAndReps
              thirdSetsAndReps={thirdSetsAndReps}
              pct={pct}
              rpe={rpe}
              isSuperSet={isSuperSet}
              isTripleSet={isTripleSet}
            />
          )}

          <div className="btn-container" style={{ gridColumn: '1 / 13' }}>
            <SubmitButton />
          </div>
        </Form>
      )}
    </Fragment>
  );
};

const FormikComp = withFormik({
  mapPropsToValues({ localPickDate }) {
    // TODO: in order to persist the form state, these are all going to be stored locally
    // via useState (like localPickDate). Formik does not seem to have their own solution
    // for this.
    return {
      primaryExercise: '',
      secondaryExercise: '',
      thirdExercise: '',
      pickDate: localPickDate,
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
  handleSubmit: (
    values,
    {
      setSubmitting,
      props: {
        authReducer: { id, jwt },
        createUserProgram,
        programReducer,
        setShowAddExModal,
      },
    }
  ) => {
    setTimeout(() => {
      createUserProgram(jwt, id, values);
      setSubmitting(false);
      if (programReducer.statusCode === 200) {
        setShowAddExModal(false);
      }
      // TODO: handle error (display error message on the form)
    }, 1000);
  },
})(AddExerciseFormik);

AddExerciseFormik.propTypes = {
  results: PropTypes.array,
  values: PropTypes.object.isRequired,
  autoComplete: PropTypes.func.isRequired,
  showExerciseForm: PropTypes.bool.isRequired,
  exerciseSelected: PropTypes.string.isRequired,
  setExercise: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  setShowExerciseForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
  authReducer: state.authReducer,
  profileReducer: state.profileReducer,
  programReducer: state.programReducer,
});

export default connect(mapStateToProps, { autoComplete, createUserProgram })(
  FormikComp
);
