import React from 'react';
import { Field } from 'formik';

const ThirdExSearchBar = props => {
  return (
    <Field
      name="thirdExercise"
      autoComplete="off"
      style={{
        gridColumn: '1 / 13',
        border: '1px solid grey',
        marginBottom: '1rem',
      }}
      placeholder=" select third exercise"
    />
  );
};

export default ThirdExSearchBar;
