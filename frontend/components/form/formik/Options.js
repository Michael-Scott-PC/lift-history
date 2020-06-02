import React, { Fragment } from 'react';
import { Field, FieldArray } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import PropTypes from 'prop-types';

const Options = ({
  pct,
  rpe,
  isSuperSet,
  isTripleSet,
  resetForm,
  setLocalIsSuperSet,
  setLocalIsTripleSet,
  localIsSuperSet,
  localIsTripleSet,
  setSecondaryEx,
  setThirdEx,
}) => {
  const handleSuperSet = resetForm => {
    setLocalIsSuperSet(!localIsSuperSet);
    setSecondaryEx('');
    resetForm();
  };

  const handleTripleSet = resetForm => {
    setLocalIsTripleSet(!localIsTripleSet);
    setThirdEx('');
    setSecondaryEx('');
    resetForm();
  };

  return (
    <Fragment>
      <FormCheckLabel style={{ gridColumn: '1 / 4' }}>Optional:</FormCheckLabel>
      <Field as={FormCheck} name="rpe" label="RPE" disabled={pct} />
      <Field
        as={FormCheck}
        name="pct"
        label="%"
        disabled={rpe}
        style={{ gridColumn: ' 9/ 13 ' }}
      />
      {/* Might not need this FieldArray element if I'm not going to pass push and remove
            helpers to handlers
      */}
      <FieldArray name="secondarySetsAndReps">
        {({ push, remove }) => (
          <Fragment>
            <Field
              name="isSuperSet"
              as={FormCheck}
              label="Super Set?"
              onClick={() => handleSuperSet(resetForm)}
              disabled={isTripleSet}
              style={{ gridColumn: '4 / 8' }}
            />
            <Field
              name="isTripleSet"
              as={FormCheck}
              label="Triple Set?"
              onClick={() => handleTripleSet(resetForm)}
              disabled={isSuperSet}
              style={{ gridColumn: '9 / 13' }}
            />
          </Fragment>
        )}
      </FieldArray>
    </Fragment>
  );
};

Options.propTypes = {
  pct: PropTypes.bool.isRequired,
  rpe: PropTypes.bool.isRequired,
  isSuperSet: PropTypes.bool.isRequired,
  isTripleSet: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  setLocalIsSuperSet: PropTypes.func.isRequired,
  setLocalIsTripleSet: PropTypes.func.isRequired,
  localIsSuperSet: PropTypes.bool.isRequired,
  localIsTripleSet: PropTypes.bool.isRequired,
  setSecondaryEx: PropTypes.func.isRequired,
  setThirdEx: PropTypes.func.isRequired,
};

export default Options;
