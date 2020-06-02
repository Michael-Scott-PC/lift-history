import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { autoComplete } from '../../../redux/actions/searchActions';
import { handleAddExercise } from '../../../utils/scheduleUtils';

const ThirdAutoComplete = ({
  searchReducer: { results },
  setFieldValue,
  thirdExercise,
  setValues,
  setThirdEx,
  resetForm,
  setShowExerciseForm,
  autoComplete,
}) => {
  useEffect(() => {
    if (thirdExercise.length > 0) {
      autoComplete(thirdExercise);
    }
  }, [thirdExercise]);

  return (
    <ul>
      {results.map(exercise => (
        <Fragment key={exercise}>
          <li onClick={() => setFieldValue('thirdExercise', `${exercise}`)}>
            {exercise}
          </li>
          <img
            src="./greenAddIcon.svg"
            alt="green add icon"
            id="add-exercise-icon"
            onClick={() =>
              handleAddExercise(
                exercise,
                setValues,
                setThirdEx,
                setShowExerciseForm,
                resetForm
              )
            }
          />
          <img
            src="./autoCompleteArrow.svg"
            alt="autocomplete arrow"
            id="auto-complete-arrow"
            onClick={() => setFieldValue('thirdExercise', `${exercise}`)}
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
          grid-column: 1 / 13;
          grid-template-columns: 8fr 1fr 1fr;
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
  );
};

ThirdAutoComplete.propTypes = {
  searchReducer: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  thirdExercise: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
  setThirdEx: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  setShowExerciseForm: PropTypes.func.isRequired,
  autoComplete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

export default connect(mapStateToProps, { autoComplete })(ThirdAutoComplete);
