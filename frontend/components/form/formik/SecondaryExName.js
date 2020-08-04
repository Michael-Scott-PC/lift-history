import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const SecondaryExName = ({ values, secondaryEx }) => {
  return (
    <Field
      name="secondaryEx"
      value={(values.secondaryExercise = secondaryEx.nameOfExercise)}
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

SecondaryExName.propTypes = {
  values: PropTypes.object.isRequired,
  secondaryEx: PropTypes.object.isRequired,
};

export default SecondaryExName;
