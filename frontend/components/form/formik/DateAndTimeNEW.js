import React from 'react';
import { Field } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const DateAndTimeNEW = ({
  values,
  setLocalPickDate,
  pickDateErrors,
  touched,
}) => {
  return (
    <>
      <Field
        as={FormCheck}
        type="checkbox"
        name="enableTime"
        label="Include time"
        style={{ gridColumn: '1 / 13', marginTop: '2rem' }}
      />
      <Field
        as={TextField}
        type="date"
        name="pickDate"
        style={{
          marginTop: '1rem',
          marginBottom: pickDateErrors && touched.pickDate ? '0' : '2rem',
          gridColumn: values.enableTime ? '1 / 7' : '1 / 13',
        }}
        label="Pick a date:"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {values.enableTime && (
        <Field
          as={TextField}
          type="time"
          name="time"
          label="Time:"
          style={{ gridColumn: '8 / 13', marginTop: '1rem' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </>
  );
};

DateAndTimeNEW.propTypes = {};

export default DateAndTimeNEW;
