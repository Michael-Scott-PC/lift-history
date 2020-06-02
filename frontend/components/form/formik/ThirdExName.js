import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const ThirdExName = ({ values, thirdEx }) => {
  return (
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
  );
};

ThirdExName.propTypes = {
  values: PropTypes.object.isRequired,
  thirdEx: PropTypes.string.isRequired,
};

export default ThirdExName;
