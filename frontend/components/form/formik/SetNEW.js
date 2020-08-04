import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const SetNEW = props => {
  const {
    remove,
    insert,
    index,
    setsName,
    repsName,
    weightName,
    rpeName,
    pctName,
    values,
    setFieldValue,
    whichSetsAndRepsStr,
    whichSetsAndRepsObj,
    rpe,
    pct,
  } = props;
  return (
    <div
      key={index}
      style={{
        display: 'grid',
        gridGap: '.5rem',
        gridTemplateColumns:
          rpe || pct
            ? '.5fr 1fr 1fr 1.2fr 1fr .5fr'
            : '.5fr 1.5fr 1.5fr 2fr .5fr',
        marginBottom: '1rem',
      }}
    >
      <button
        type="button"
        className="btn"
        onClick={() => whichSetsAndRepsObj.length > 1 && remove(index)}
        style={{
          paddingLeft: rpe || pct ? '0' : '6px',
          paddingRight: rpe || pct ? '0' : '6px',
        }}
      >
        <img src="/removeIcon.svg" alt="remove exercise icon" />
      </button>
      <Field
        type="input"
        as={TextField}
        name={setsName}
        variant="outlined"
        label="sets"
      />
      <Field
        type="input"
        as={TextField}
        name={repsName}
        variant="outlined"
        label="reps"
      />
      <Field
        type="input"
        as={TextField}
        name={weightName}
        variant="outlined"
        label="lbs/kg"
      />
      {rpe && (
        <Field
          type="input"
          as={TextField}
          name={rpeName}
          variant="outlined"
          label="RPE"
        />
      )}
      {pct && (
        <Field
          type="input"
          as={TextField}
          name={pctName}
          variant="outlined"
          label="%"
        />
      )}
      <button
        className="btn"
        type="button"
        onClick={() =>
          insert(index + 1, {
            sets: '',
            reps: '',
            weight: '',
          })
        }
        style={{
          paddingLeft: rpe || pct ? '0' : '6px',
          paddingRight: rpe || pct ? '0' : '6px',
        }}
      >
        <img
          src="/greenAddIcon.svg"
          alt="add exercise icon"
          style={{ paddingBottom: '2px' }}
        />
      </button>
    </div>
  );
};

SetNEW.propTypes = {};

export default SetNEW;
