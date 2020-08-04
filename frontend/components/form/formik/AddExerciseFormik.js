import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { mutate, trigger } from 'swr';
import { v4 as uuidv4 } from 'uuid';

import ErrorMsg from './ErrorMsg';
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
import {
  checkForColor,
  createColor,
  createColorCodeExercise,
} from '../../../redux/actions/profileActions';
import exerciseSchema from '../schema/exerciseSchema';

const AddExerciseFormik = props => {
  console.log('AddExerciseFormik props: ', props);
  const {
    searchReducer: { results },
    values,
    showExerciseForm,
    primaryExerciseSelected,
    setPrimaryExercise,
    setValues,
    setFieldValue,
    handleSubmit,
    resetForm,
    setShowExerciseForm,
    setLocalPickDate,
    setLocalPrimarySetsAndReps,
    setLocalSecondarySetsAndReps,
    setLocalThirdSetsAndReps,
    errors,
    touched,
  } = props;
  console.log('values: ', values);
  console.log('results: ', results);
  // For now, in order to persist these values from formik I'm storing them in local state.
  // When I update any part of the form, e.g. selecting an exercise, the form values reset
  // to their defaults, which is not what I want.
  const [secondaryEx, setSecondaryEx] = useState({});
  const [localIsSuperSet, setLocalIsSuperSet] = useState(false);
  const [thirdEx, setThirdEx] = useState({});
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
    secondarySetsAndReps: secondarySetsAndRepsErrors,
    thirdSetsAndReps: thirdSetsAndRepsErrors,
  } = errors;

  const {
    primarySetsAndReps: primarySetsAndRepsTouched,
    secondarySetsAndReps: secondarySetsAndRepsTouched,
    thirdSetsAndReps: thirdSetsAndRepsTouched,
  } = touched;

  useEffect(() => {
    if (!showExerciseForm) {
      resetForm();
    }

    setFieldValue('primaryExercise', primaryExerciseSelected.nameOfExercise);
    setFieldValue('primaryExerciseId', primaryExerciseSelected.id);
    if (Object.entries(secondaryEx).length !== 0) {
      console.log('THIS RAN!!!!!!!!!!!!!!');
      setFieldValue('secondaryExercise', secondaryEx.nameOfExercise);
      setFieldValue('secondaryExerciseId', secondaryEx.id);
    }
    if (Object.entries(thirdEx).length !== 0) {
      setFieldValue('thirdExercise', thirdEx.nameOfExercise);
      setFieldValue('thirdExerciseId', thirdEx.id);
    }
  }, [showExerciseForm, primaryExerciseSelected, secondaryEx, thirdEx]);

  return (
    <Fragment>
      {Object.entries(primaryExerciseSelected).length !== 0 && (
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
            primaryExerciseSelected={primaryExerciseSelected}
            setPrimaryExercise={setPrimaryExercise}
            setFieldValue={setFieldValue}
            setValues={setValues}
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
            setLocalPrimarySetsAndReps={setLocalPrimarySetsAndReps}
          />

          {/* We only want to render the error messages if all 3 required fields have been touched */}
          {primarySetsAndRepsErrors && primarySetsAndRepsTouched && (
            <ErrorMsg
              whichSetsAndRepsErrors={primarySetsAndRepsErrors}
              whichSetsAndRepsTouched={primarySetsAndRepsTouched}
            />
          )}

          {/* Displays search bar for secondary exercise */}
          {(localIsSuperSet || localIsTripleSet) &&
            Object.entries(secondaryEx).length === 0 && (
              <SecondaryExSearchBar />
            )}

          {/* Displays autocomplete list for secondary exercise */}
          {(localIsSuperSet || localIsTripleSet) &&
            secondaryExercise.length > 0 &&
            Object.entries(secondaryEx).length === 0 && (
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
          {(localIsSuperSet || localIsTripleSet) &&
            Object.entries(secondaryEx).length !== 0 && (
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
              setLocalSecondarySetsAndReps={setLocalSecondarySetsAndReps}
            />
          )}

          {secondarySetsAndRepsErrors && secondarySetsAndRepsTouched && (
            <ErrorMsg
              whichSetsAndRepsErrors={secondarySetsAndRepsErrors}
              whichSetsAndRepsTouched={secondarySetsAndRepsTouched}
            />
          )}

          {/* Displays search bar for third exercise  */}
          {localIsTripleSet && Object.entries(thirdEx).length === 0 && (
            <ThirdExSearchBar />
          )}

          {/* Displays autocomplete results for third exercise search bar */}
          {localIsTripleSet &&
            thirdExercise.length > 0 &&
            Object.entries(thirdEx).length === 0 && (
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
          {localIsTripleSet && Object.entries(thirdEx).length !== 0 && (
            <ThirdExName thirdEx={thirdEx} values={values} />
          )}

          {/* Displays sets and reps for third exercise */}
          {localIsTripleSet && (
            <ThirdSetsAndReps
              thirdSetsAndReps={thirdSetsAndReps}
              pct={pct}
              rpe={rpe}
              isSuperSet={isSuperSet}
              isTripleSet={isTripleSet}
              setLocalThirdSetsAndReps={setLocalThirdSetsAndReps}
            />
          )}
          {thirdSetsAndRepsErrors && thirdSetsAndRepsTouched && (
            <ErrorMsg
              whichSetsAndRepsErrors={thirdSetsAndRepsErrors}
              whichSetsAndRepsTouched={thirdSetsAndRepsTouched}
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
  mapPropsToValues({
    localPickDate,
    localPrimarySetsAndReps,
    localSecondarySetsAndReps,
    localThirdSetsAndReps,
    primaryExerciseSelected,
  }) {
    // TODO: in order to persist the form state, these are all going to be stored locally
    // via useState (like localPickDate). Formik does not seem to have their own solution
    // for this.
    return {
      primaryExerciseId: primaryExerciseSelected.id,
      primaryExercise: '',
      primaryExerciseBgColor: '',
      isDefaultColor: false,
      secondaryExerciseId: '',
      secondaryExercise: '',
      secondaryExerciseBgColor: '',
      thirdExerciseId: '',
      thirdExercise: '',
      thirdExerciseBgColor: '',
      pickDate: localPickDate,
      enableTime: false,
      time: '',
      isSuperSet: false,
      isTripleSet: false,
      isWarmup: false,
      isWorkingSet: false,
      rpe: false,
      pct: false,
      primarySetsAndReps: localPrimarySetsAndReps,
      secondarySetsAndReps: localSecondarySetsAndReps,
      thirdSetsAndReps: localThirdSetsAndReps,
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
        createColorCodeExercise,
        programReducer,
        setShowAddExModal,
        setPrimaryExercise,
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

    // TODO: colors are unique in the DB. We need to check if
    // the color exists, if not createColor. Send the color id
    // (res.data.id) to createColorCodeExercise
    // remove hash from hex color code
    const sanitizedColor = values.primaryExerciseBgColor.slice(1);
    let verifiedColor;
    const checkForColorRes = await checkForColor(sanitizedColor, jwt);
    if (checkForColorRes) {
      verifiedColor = checkForColorRes;
    }
    if (!checkForColorRes) {
      verifiedColor = await createColor(sanitizedColor, jwt);
    }
    console.log('verfiedColor: ', verifiedColor);

    createUserProgram(jwt, id, values);

    const { primaryExercise, isDefaultColor } = values;
    createColorCodeExercise(
      primaryExercise.id,
      verifiedColor[0].id,
      isDefaultColor,
      jwt,
      id
    );

    setSubmitting(false);

    // If successful POST, we want to clear the form and close modal
    if (programReducer.statusCode === 200 || programReducer.program) {
      setPrimaryExercise({});
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
  primaryExerciseSelected: PropTypes.object.isRequired,
  setPrimaryExercise: PropTypes.func.isRequired,
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
  createColorCodeExercise,
  setsAndRepsHelper,
  mutate,
})(FormikComp);
