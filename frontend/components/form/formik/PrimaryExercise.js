import React, { Fragment, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Field } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

const PrimaryExercise = ({
  setPrimaryExercise,
  setFieldValue,
  setValues,
  primaryExerciseSelected,
  values,
}) => {
  // console.log('values: ', values);
  const [localBackgroundColor, setBackgroundColor] = useState('#d0021b');
  // console.log('localBackgroundColor: ', localBackgroundColor);
  const [localMakeDefaultColor, setMakeDefaultColor] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleColorSelect = () => {
    setShowSlider(false);
  };

  const handleMakeColorDefault = () => {
    setMakeDefaultColor(!localMakeDefaultColor);
  };

  const handleColorChange = (color, e) => {
    // console.log('color: ', color);
    // console.log('e: ', e);
    setBackgroundColor(color.hex);
    // setFieldValue('primaryExerciseBgColor', localBackgroundColor);
  };

  const handleClearExercise = () => {
    setPrimaryExercise('');
    setFieldValue('primaryExercise', '');
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn"
        onClick={() => handleClearExercise()}
        style={{
          gridColumn: '1 / 2',
          paddingLeft: '0',
          paddingRight: '0',
          paddingBottom: '0',
        }}
      >
        <img src="/removeIcon.svg" alt="remove exercise icon" />
      </button>
      <Field
        name="primaryExercise"
        value={
          (values.primaryExercise = primaryExerciseSelected.nameOfExercise)
        }
        type="text"
        readOnly
        style={{
          gridColumn: '2 / 13',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          marginLeft: '.5rem',
          border: 'none',
        }}
      />
      <div className="color-container">
        <label htmlFor="current-color">Select color:</label>
        <div
          className="current-color"
          style={{
            display: showSlider ? 'none' : 'inline-block',
            backgroundColor: localBackgroundColor,
            width: '20px',
            height: '20px',
            marginLeft: '.75rem',
          }}
          onClick={() => setShowSlider(true)}
        ></div>
        <div
          className="slider-container"
          style={{
            display: showSlider ? 'grid' : 'none',
            gridTemplateColumns: 'repeat(12, 1fr)',
          }}
        >
          <div className="slider" style={{ gridColumn: '1 / 11' }}>
            <SliderPicker
              name="primaryExerciseBgColor"
              color={localBackgroundColor}
              onChangeComplete={handleColorChange}
              value={(values.primaryExerciseBgColor = localBackgroundColor)}
            />
          </div>
          <AiOutlineCheckCircle
            style={{
              gridColumn: '12 / 13',
              fontSize: '1.5rem',
              color: '#3FC645',
              marginTop: '.5rem',
            }}
            onClick={() => handleColorSelect()}
          />
          <Field
            name="isDefaultColor"
            value={(values.isDefaultColor = localMakeDefaultColor)}
            as={FormCheck}
            label="Make default color for exercise?"
            onClick={() => handleMakeColorDefault()}
            style={{ gridColumn: '1 / 13', marginBottom: '2rem' }}
          />
        </div>
      </div>
      <style jsx>{`
        .color-container {
          grid-column: 1 / 13;
        }

        .slider {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </Fragment>
  );
};

PrimaryExercise.propTypes = {
  setPrimaryExercise: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  primaryExerciseSelected: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default PrimaryExercise;
