import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { mutate, trigger } from 'swr';
import { v4 as uuidv4 } from 'uuid';

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
import ThirdSetsAndReps from './ThirdSetsAndReps';

import { autoComplete } from '../../../redux/actions/searchActions';
import {
  createUserProgram,
  setsAndRepsHelper,
} from '../../../redux/actions/programActions';
import exerciseSchema from '../schema/exerciseSchema';

const AddExerciseFormik = ({
  searchReducer: { results },
  values,
  showExerciseForm,
  exerciseSelected,
  setExercise,
  setValues,
  setFieldValue,
  handleSubmit,
  resetForm,
  setShowExerciseForm,
  setLocalPickDate,
  errors,
  touched,
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
    enableTime,
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

  const {
    pickDate: pickDateErrors,
    primarySetsAndReps: primarySetsAndRepsErrors,
  } = errors;

  useEffect(() => {
    if (!showExerciseForm) {
      resetForm();
    }
  }, [showExerciseForm]);

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
            enableTime={enableTime}
            time={time}
            values={values}
            setLocalPickDate={setLocalPickDate}
            pickDateErrors={pickDateErrors}
            touched={touched}
          />
          {touched.pickDate && pickDateErrors && (
            <p style={{ color: 'red', gridColumn: '1 / 13' }}>
              {pickDateErrors}
            </p>
          )}

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
            values={values}
            primarySetsAndReps={primarySetsAndReps}
            isSuperSet={isSuperSet}
            isTripleSet={isTripleSet}
            touched={touched}
          />

          {/* We only want to render the error messages if all 3 required fields have been touched */}
          {primarySetsAndRepsErrors &&
            touched.primarySetsAndReps &&
            touched.primarySetsAndReps[0].sets &&
            touched.primarySetsAndReps[0].reps &&
            touched.primarySetsAndReps[0].weight &&
            primarySetsAndRepsErrors.map(errorMsg => (
              <Fragment key={uuidv4()}>
                <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                  {errorMsg.sets}
                </p>
                <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                  {errorMsg.reps}
                </p>
                <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                  {errorMsg.weight}
                </p>
              </Fragment>
            ))}

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
      enableTime: false,
      time: '',
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
  validationSchema: props => exerciseSchema,
  handleSubmit: async (
    values,
    {
      setSubmitting,
      props: {
        authReducer: { id, jwt },
        createUserProgram,
        programReducer,
        setShowAddExModal,
        setExercise,
        setLocalPickDate,
        dataSWR,
      },
    }
  ) => {
    const updateUI = async () => {
      const getExerciseId = false;
      const mapValues = {
        scheduleExercise: values.pickDate + 'T04:00:00.000Z',
        isSuperSet: values.isSuperSet,
        isTripleSet: values.isTripleSet,
        thisDaysExercises: await setsAndRepsHelper(values, getExerciseId),
      };
      return mapValues;
    };

    const result = await updateUI();

    mutate(
      [`${process.env.strapiAPI}/graphql`, jwt, id],
      [...dataSWR, result],
      false
    );

    createUserProgram(jwt, id, values);
    setSubmitting(false);

    // If successful POST, we want to clear the form and close modal
    if (programReducer.statusCode === 200 || programReducer.program) {
      setExercise('');
      setLocalPickDate('');
      setShowAddExModal(false);
    }
    // TODO: handle error (display error message on the form)
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

export default connect(mapStateToProps, {
  autoComplete,
  createUserProgram,
  setsAndRepsHelper,
  mutate,
})(FormikComp);
