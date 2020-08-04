import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import { mutate, trigger } from 'swr';

import DateAndTimeNEW from './DateAndTimeNEW';
import ErrorMsg from './ErrorMsg';
import ExerciseNEW from './ExerciseNEW';
import OptionsNEW from './OptionsNEW';
import SetsAndRepsNEW from './SetsAndRepsNEW';
import SearchBarNEW from './SearchBarNEW';

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
import SubmitButton from '../../button/SubmitButton';

const AddExerciseFormikNEW = props => {
  //   console.log('AddExerciseFormikNEW props: ', props);
  const {
    authReducer,
    errors,
    handleSubmit,
    resetForm,
    setFieldValue,
    touched,
    values,
  } = props;

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

  const [showExerciseForm, setShowExerciseForm] = useState(false);

  return (
    <>
      {Object.entries(values.primaryExercise).length === 0 && (
        <SearchBarNEW
          values={values}
          setFieldValue={setFieldValue}
          setShowExerciseForm={setShowExerciseForm}
          whichValue={'primaryExercise'}
        />
      )}

      {Object.entries(values.primaryExercise).length > 0 && (
        <Form
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: showExerciseForm ? 'grid' : 'none',
            gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
          }}
        >
          {/* Date & Time section */}
          <DateAndTimeNEW
            values={values}
            pickDateErrors={pickDateErrors}
            touched={touched}
          />
          {touched.pickDate && pickDateErrors && (
            <p style={{ color: 'red', gridColumn: '1 / 13' }}>
              {pickDateErrors}
            </p>
          )}

          {/* Optional form check boxes: RPE, pct, super set, triple set */}
          <OptionsNEW values={values} setFieldValue={setFieldValue} />

          {/* Displays the selected primaryExercise name, along with color options */}
          <ExerciseNEW
            values={values}
            setFieldValue={setFieldValue}
            whichExercise={'primaryExercise'}
            whichColor={'primaryExerciseBgColor'}
            theColor={values.primaryExerciseBgColor}
          />

          {/* Displays primaryExercise sets and reps */}
          <SetsAndRepsNEW
            values={values}
            setFieldValue={setFieldValue}
            whichSetsAndRepsStr={'primarySetsAndReps'}
            whichSetsAndRepsObj={values.primarySetsAndReps}
          />

          {/* We only want to render the error messages if all 3 required fields have been touched */}
          {primarySetsAndRepsErrors && primarySetsAndRepsTouched && (
            <ErrorMsg
              whichSetsAndRepsErrors={primarySetsAndRepsErrors}
              whichSetsAndRepsTouched={primarySetsAndRepsTouched}
            />
          )}

          {/* Displays search bar for secondary exercise if isSuperSet || isTripleSet is true */}
          {(values.isSuperSet || values.isTripleSet) &&
            Object.entries(values.secondaryExercise).length === 0 && (
              <SearchBarNEW
                values={values}
                setFieldValue={setFieldValue}
                setShowExerciseForm={setShowExerciseForm}
                whichValue={'secondaryExercise'}
              />
            )}

          {/* Displays the selected secondaryExercise name, along with color options */}
          {Object.entries(values.secondaryExercise).length > 0 && (
            <>
              <ExerciseNEW
                values={values}
                setFieldValue={setFieldValue}
                whichExercise={'secondaryExercise'}
                whichColor={'secondaryExerciseBgColor'}
                theColor={values.secondaryExerciseBgColor}
              />

              {/* Displays secondaryExercise sets and reps */}
              <SetsAndRepsNEW
                values={values}
                setFieldValue={setFieldValue}
                whichSetsAndRepsStr={'secondarySetsAndReps'}
                whichSetsAndRepsObj={values.secondarySetsAndReps}
              />
              {secondarySetsAndRepsErrors && secondarySetsAndRepsTouched && (
                <ErrorMsg
                  whichSetsAndRepsErrors={secondarySetsAndRepsErrors}
                  whichSetsAndRepsTouched={secondarySetsAndRepsTouched}
                />
              )}
            </>
          )}

          {/* Displays search bar for third exercise if isTripleSet is true */}
          {values.isTripleSet &&
            Object.entries(values.thirdExercise).length === 0 && (
              <SearchBarNEW
                values={values}
                setFieldValue={setFieldValue}
                setShowExerciseForm={setShowExerciseForm}
                whichValue={'thirdExercise'}
              />
            )}

          {/* Displays the selected thirdExercise name, along with color options */}
          {Object.entries(values.thirdExercise).length > 0 && (
            <>
              <ExerciseNEW
                values={values}
                setFieldValue={setFieldValue}
                whichExercise={'thirdExercise'}
                whichColor={'thirdExerciseBgColor'}
                theColor={values.thirdExerciseBgColor}
              />

              {/* Displays thirdExercise sets and reps */}
              <SetsAndRepsNEW
                values={values}
                setFieldValue={setFieldValue}
                whichSetsAndRepsStr={'thirdSetsAndReps'}
                whichSetsAndRepsObj={values.thirdSetsAndReps}
              />
              {thirdSetsAndRepsErrors && thirdSetsAndRepsTouched && (
                <ErrorMsg
                  whichSetsAndRepsErrors={thirdSetsAndRepsErrors}
                  whichSetsAndRepsTouched={thirdSetsAndRepsTouched}
                />
              )}
            </>
          )}

          <div
            className="btn-container"
            style={{ gridColumn: '1 / 13', marginBottom: '2rem' }}
          >
            <SubmitButton />
          </div>
        </Form>
      )}
    </>
  );
};

const FormikComp = withFormik({
  mapPropsToValues: () => ({
    primaryExercise: {},
    primaryExerciseBgColor: '#d0021b',
    isDefaultColor: false,
    secondaryExercise: {},
    secondaryExerciseBgColor: '#1565b5',
    thirdExercise: {},
    thirdExerciseBgColor: '#28a745',
    pickDate: '',
    enableTime: false,
    time: '',
    isSuperSet: false,
    isTripleSet: false,
    isWarmup: false,
    isWorkingSet: false,
    rpe: false,
    pct: false,
    primarySetsAndReps: [{ sets: '', reps: '', weight: '', rpe: '', pct: '' }],
    searchTerm: '',
    secondarySetsAndReps: [
      { sets: '', reps: '', weight: '', rpe: '', pct: '' },
    ],
    thirdSetsAndReps: [{ sets: '', reps: '', weight: '', rpe: '', pct: '' }],
  }),
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
        dataSWR,
      },
    }
  ) => {
    const updateUI = async () => {
      const getExerciseId = false;
      const getColorId = false;
      const mapValues = {
        scheduleExercise: values.pickDate + 'T04:00:00.000Z',
        isSuperSet: values.isSuperSet,
        isTripleSet: values.isTripleSet,
        thisDaysExercises: await setsAndRepsHelper(
          values,
          getExerciseId,
          getColorId
        ),
      };
      return mapValues;
    };

    const result = await updateUI();
    console.log('updateUI result: ', result);

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
    const colorId = verifiedColor[0].id;

    createUserProgram(jwt, id, values, colorId);

    const { primaryExercise, isDefaultColor } = values;
    // console.log('primaryExercise: ', primaryExercise);
    createColorCodeExercise(
      primaryExercise.id,
      colorId,
      isDefaultColor,
      jwt,
      id
    );

    setSubmitting(false);
  },
})(AddExerciseFormikNEW);

AddExerciseFormikNEW.propTypes = {};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

export default connect(mapStateToProps, {
  createUserProgram,
  createColorCodeExercise,
  setsAndRepsHelper,
  mutate,
})(FormikComp);
