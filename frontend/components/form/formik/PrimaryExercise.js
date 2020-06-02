import React, { Fragment } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const PrimaryExercise = ({
  setExercise,
  setFieldValue,
  exerciseSelected,
  values,
}) => {
  const handleClearExercise = () => {
    setExercise('');
    setFieldValue('primaryExercise', '');
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn"
        onClick={() => handleClearExercise()}
        style={{
          gridColumn: '1 / 2',
          paddingLeft: '0',
          paddingRight: '0',
          paddingBottom: '0',
        }}
      >
        <img src="removeIcon.svg" alt="remove exercise icon" />
      </button>
      <Field
        name="primaryExercise"
        value={(values.primaryExercise = exerciseSelected)}
        readOnly
        style={{
          gridColumn: '2 / 13',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          marginLeft: '.5rem',
          border: 'none',
        }}
      />
    </Fragment>
  );
};

PrimaryExercise.propTypes = {
  setExercise: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  exerciseSelected: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

export default PrimaryExercise;
