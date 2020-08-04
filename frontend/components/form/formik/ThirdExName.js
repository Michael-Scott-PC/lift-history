import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const ThirdExName = ({ values, thirdEx }) => {
  console.log('thirdEx', thirdEx);
  return (
    <Field
      name="thirdEx"
      value={(values.thirdExercise = thirdEx.nameOfExercise)}
      type="text"
      readOnly
      style={{
        gridColumn: '1 / 13',
        marginTop: '1.5rem',
        marginBottom: '1rem',
        fontSize: '1.5rem',
      }}
    />
  );
};

ThirdExName.propTypes = {
  values: PropTypes.object.isRequired,
  thirdEx: PropTypes.object.isRequired,
};

export default ThirdExName;
