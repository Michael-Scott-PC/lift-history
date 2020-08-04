import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const ErrorMsg = ({ whichSetsAndRepsErrors, whichSetsAndRepsTouched }) => {
  return whichSetsAndRepsTouched.map(
    (obj, index) =>
      obj &&
      whichSetsAndRepsTouched[index] &&
      whichSetsAndRepsTouched[index].sets &&
      whichSetsAndRepsTouched[index].reps &&
      whichSetsAndRepsTouched[index].weight &&
      whichSetsAndRepsErrors.map(
        (errorMsg, msgIndex) =>
          index === msgIndex && (
            <Fragment key={uuidv4()}>
              <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                {errorMsg && errorMsg.sets}
              </p>
              <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                {errorMsg && errorMsg.reps}
              </p>
              <p style={{ color: 'red', gridColumn: '1 / 13' }}>
                {errorMsg && errorMsg.weight}
              </p>
            </Fragment>
          )
      )
  );
};

ErrorMsg.propTypes = {
  whichSetsAndRepsErrors: PropTypes.array.isRequired,
  whichSetsAndRepsTouched: PropTypes.array.isRequired,
};

export default ErrorMsg;
