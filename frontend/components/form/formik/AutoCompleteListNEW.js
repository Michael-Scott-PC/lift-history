import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleAddExercise } from '../../../utils/scheduleUtils';
import { clearResults } from '../../../redux/actions/searchActions';

const AutoCompleteListNEW = props => {
  const {
    clearResults,
    results,
    setFieldValue,
    setShowExerciseForm,
    values,
    whichValue,
  } = props;

  const addExerciseHelper = (
    whichValue,
    exercise,
    setFieldValue,
    setShowExerciseForm
  ) => {
    handleAddExercise(whichValue, exercise, setFieldValue, setShowExerciseForm);
    clearResults();
  };

  return (
    <>
      {results && values.searchTerm.length > 0 && (
        <ul>
          {results.map(exercise => (
            <Fragment key={exercise.id}>
              <li
                onClick={() =>
                  setFieldValue('searchTerm', exercise.nameOfExercise)
                }
              >
                {exercise.nameOfExercise}
              </li>
              <img
                src="/greenAddIcon.svg"
                alt="green add icon"
                id="add-exercise-icon"
                onClick={() =>
                  addExerciseHelper(
                    whichValue,
                    exercise,
                    setFieldValue,
                    setShowExerciseForm
                  )
                }
              />
              <img
                src="/autoCompleteArrow.svg"
                alt="autocomplete arrow"
                id="auto-complete-arrow"
                onClick={() =>
                  setFieldValue('searchTerm', exercise.nameOfExercise)
                }
              />
            </Fragment>
          ))}
          <style jsx>{`
            ul {
              list-style: none;
              border: 1px solid rgba(0, 0, 0, 0.25);
              padding-left: 1.5rem;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
              box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
              display: grid;
              grid-template-columns: 8fr 1fr 1fr;
              grid-column: 1 / 13;
              padding-top: 0.5rem;
            }
            li {
              margin-bottom: 0.25rem;
            }
            #auto-complete-arrow {
              align-self: center;
              margin-bottom: 0.25rem;
            }
          `}</style>
        </ul>
      )}
    </>
  );
};

AutoCompleteListNEW.propTypes = {};

export default connect(null, { clearResults })(AutoCompleteListNEW);
