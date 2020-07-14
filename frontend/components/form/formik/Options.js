import React, { Fragment } from 'react';
import { Field, FieldArray } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import PropTypes from 'prop-types';

const Options = ({
  pct,
  rpe,
  values,
  setLocalIsSuperSet,
  setLocalIsTripleSet,
  localIsSuperSet,
  localIsTripleSet,
  setSecondaryEx,
  setThirdEx,
}) => {
  const handleSuperSet = () => {
    setLocalIsSuperSet(!localIsSuperSet);
    setSecondaryEx('');
  };

  const handleTripleSet = () => {
    setLocalIsTripleSet(!localIsTripleSet);
    setThirdEx('');
    setSecondaryEx('');
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
      <Field
        name="isSuperSet"
        value={(values.isSuperSet = localIsSuperSet)}
        as={FormCheck}
        label="Super Set?"
        onClick={() => handleSuperSet()}
        disabled={localIsTripleSet}
        style={{ gridColumn: '4 / 8' }}
      />
      <Field
        name="isTripleSet"
        value={(values.isTripleSet = localIsTripleSet)}
        as={FormCheck}
        label="Triple Set?"
        onClick={() => handleTripleSet()}
        disabled={localIsSuperSet}
        style={{ gridColumn: '9 / 13' }}
      />
    </Fragment>
  );
};

Options.propTypes = {
  pct: PropTypes.bool.isRequired,
  rpe: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setLocalIsSuperSet: PropTypes.func.isRequired,
  setLocalIsTripleSet: PropTypes.func.isRequired,
  localIsSuperSet: PropTypes.bool.isRequired,
  localIsTripleSet: PropTypes.bool.isRequired,
  setSecondaryEx: PropTypes.func.isRequired,
  setThirdEx: PropTypes.func.isRequired,
};

export default Options;
