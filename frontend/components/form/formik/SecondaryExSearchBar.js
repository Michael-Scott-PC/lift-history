import React, { Fragment } from 'react';
import { Field } from 'formik';

const SecondaryExSearchBar = props => {
  return (
    <Fragment>
      <Field
        name="secondaryExercise"
        autoComplete="off"
        style={{
          gridColumn: '1 / 13',
          border: '1px solid grey',
          marginBottom: '1rem',
        }}
        placeholder=" select second exercise"
      />
    </Fragment>
  );
};

export default SecondaryExSearchBar;
