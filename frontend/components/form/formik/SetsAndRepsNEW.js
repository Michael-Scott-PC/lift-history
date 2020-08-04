import React from 'react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';

// import SetsAndReps from './SetsAndReps';
import SetNEW from './SetNEW';

const SetsAndRepsNEW = props => {
  // console.log('SetsAndRepsNEW props: ', props);
  const {
    values,
    setFieldValue,
    whichSetsAndRepsStr,
    whichSetsAndRepsObj,
  } = props;

  return (
    <>
      <FieldArray name={whichSetsAndRepsStr}>
        {({ remove, insert }) => (
          <div id="sets-container" style={{ gridColumn: '1 / 13' }}>
            {whichSetsAndRepsObj.map((obj, index) => {
              const setsName = `${whichSetsAndRepsStr}.${index}.sets`;
              const repsName = `${whichSetsAndRepsStr}.${index}.reps`;
              const weightName = `${whichSetsAndRepsStr}.${index}.weight`;
              const rpeName = `${whichSetsAndRepsStr}.${index}.rpe`;
              const pctName = `${whichSetsAndRepsStr}.${index}.pct`;
              return (
                <SetNEW
                  remove={remove}
                  insert={insert}
                  index={index}
                  setsName={setsName}
                  repsName={repsName}
                  weightName={weightName}
                  rpeName={rpeName}
                  pctName={pctName}
                  values={values}
                  whichSetsAndRepsStr={whichSetsAndRepsStr}
                  whichSetsAndRepsObj={whichSetsAndRepsObj}
                  rpe={values.rpe}
                  pct={values.pct}
                  key={index}
                  setFieldValue={setFieldValue}
                />
              );
            })}
          </div>
        )}
      </FieldArray>
    </>
  );
};

SetsAndRepsNEW.propTypes = {};

export default SetsAndRepsNEW;
