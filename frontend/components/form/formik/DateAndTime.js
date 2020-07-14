import React, { Fragment, useState, useEffect } from 'react';
import { Field } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const DateAndTime = ({
  time,
  enableTime,
  values,
  setLocalPickDate,
  pickDateErrors,
  touched,
}) => {
  useEffect(() => {
    setLocalPickDate(values.pickDate);
  }, [values.pickDate]);

  return (
    <Fragment>
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
          gridColumn: enableTime ? '1 / 7' : '1 / 13',
        }}
        label="Pick a date:"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {enableTime && (
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
    </Fragment>
  );
};

DateAndTime.propTypes = {
  enableTime: PropTypes.bool.isRequired,
};

export default DateAndTime;
