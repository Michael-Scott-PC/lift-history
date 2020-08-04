import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

const OptionsNEW = props => {
  const { values, setFieldValue } = props;

  const handleSuperSet = () => {
    setFieldValue('isSuperSet', !values.isSuperSet);
    setFieldValue('secondaryExercise', '');
  };

  const handleTripleSet = () => {
    setFieldValue('isTripleSet', !values.isTripleSet);
    setFieldValue('secondaryExercise', '');
    setFieldValue('thirdExercise', '');
  };

  return (
    <>
      <FormCheckLabel style={{ gridColumn: '1 / 4' }}>Optional:</FormCheckLabel>
      <Field name="rpe" as={FormCheck} label="RPE" disabled={values.pct} />
      <Field
        name="pct"
        as={FormCheck}
        label="%"
        disabled={values.rpe}
        style={{ gridColumn: ' 9/ 13 ' }}
      />
      <Field
        name="isSuperSet"
        as={FormCheck}
        onChange={() => handleSuperSet('secondaryExercise', '')}
        label="Super Set?"
        disabled={values.isTripleSet}
        style={{ gridColumn: '4 / 8' }}
      />
      <Field
        name="isTripleSet"
        as={FormCheck}
        onChange={() => handleTripleSet('thirdExercise', '')}
        label="Triple Set?"
        disabled={values.isSuperSet}
        style={{ gridColumn: '9 / 13' }}
      />
    </>
  );
};

OptionsNEW.propTypes = {};

export default OptionsNEW;
