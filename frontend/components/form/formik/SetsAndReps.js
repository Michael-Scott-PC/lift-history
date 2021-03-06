import React, { useEffect, Fragment, useState } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const SetsAndReps = ({
  remove,
  insert,
  index,
  setsName,
  repsName,
  weightName,
  rpeName,
  pctName,
  values,
  primarySetsAndReps,
  rpe,
  pct,
}) => {
  const [localSets, setLocalSets] = useState('');
  //   console.log('localSets: ', localSets);
  const [localReps, setLocalReps] = useState('');
  //   console.log('localReps: ', localReps);
  const [localWeight, setLocalWeight] = useState('');
  //   console.log('localWeight: ', localWeight);

  useEffect(() => {
    setLocalSets(values.primarySetsAndReps[index].sets);
    setLocalReps(values.primarySetsAndReps[index].reps);
    setLocalWeight(values.primarySetsAndReps[index].weight);
  }, [
    values.primarySetsAndReps[index].sets,
    values.primarySetsAndReps[index].reps,
    values.primarySetsAndReps[index].weight,
  ]);

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

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
        onClick={() => primarySetsAndReps.length > 1 && remove(index)}
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
        value={(values.primarySetsAndReps[index].sets = localSets)}
        onChange={e => handleChange(e, setLocalSets)}
        variant="outlined"
        label="sets"
      />
      <Field
        type="input"
        as={TextField}
        name={repsName}
        value={(values.primarySetsAndReps[index].reps = localReps)}
        onChange={e => handleChange(e, setLocalReps)}
        variant="outlined"
        label="reps"
      />
      <Field
        type="input"
        as={TextField}
        name={weightName}
        value={(values.primarySetsAndReps[index].weight = localWeight)}
        onChange={e => handleChange(e, setLocalWeight)}
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

SetsAndReps.propTypes = {};

export default SetsAndReps;
