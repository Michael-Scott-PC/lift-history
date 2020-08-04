import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Field } from 'formik';
import FormCheck from 'react-bootstrap/FormCheck';
import { SliderPicker } from 'react-color';

const ExerciseNEW = props => {
  // console.log('ExerciseNEW props: ', props);
  const { theColor, values, setFieldValue, whichColor, whichExercise } = props;
  const [showSlider, setShowSlider] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => setFieldValue(whichExercise, '')}
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
        name={`${whichExercise}.nameOfExercise`}
        // value={
        //   (values.primaryExercise = primaryExerciseSelected.nameOfExercise)
        // }
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
            backgroundColor: theColor,
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
              name={`${whichColor}`}
              color={theColor}
              onChange={color => setFieldValue(`${whichColor}`, `${color.hex}`)}
              //   value={(values.primaryExerciseBgColor = localBackgroundColor)}
            />
          </div>
          <AiOutlineCheckCircle
            style={{
              gridColumn: '12 / 13',
              fontSize: '1.5rem',
              color: '#3FC645',
              marginTop: '.5rem',
            }}
            onClick={() => setShowSlider(false)}
          />
          <Field
            name="isDefaultColor"
            // value={(values.isDefaultColor = localMakeDefaultColor)}
            as={FormCheck}
            label="Make default color for exercise?"
            // onClick={() => handleMakeColorDefault()}
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
    </>
  );
};

ExerciseNEW.propTypes = {};

export default ExerciseNEW;
