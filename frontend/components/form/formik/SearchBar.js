import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import {
  autoComplete,
  clearResults,
} from '../../../redux/actions/searchActions';
import { handleAddExercise } from '../../../utils/scheduleUtils';

const SearchBar = ({
  autoComplete,
  clearResults,
  searchReducer: { results },
  setShowExerciseForm,
  setPrimaryExercise,
}) => {
  return (
    <Fragment>
      <Formik
        onSubmit={console.log}
        initialValues={{
          searchTerm: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          resetForm,
          setValues,
        }) => {
          useEffect(() => {
            if (values.searchTerm.length > 0) {
              autoComplete(values.searchTerm);
            }
          }, [values.searchTerm]);

          const addExerciseHelper = (
            exercise,
            setValues,
            setPrimaryExercise,
            setShowExerciseForm,
            resetForm
          ) => {
            handleAddExercise(
              exercise,
              setValues,
              setPrimaryExercise,
              setShowExerciseForm,
              resetForm
            );
            clearResults();
          };

          return (
            <>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  controlId="formGroupSearch"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3fr 3fr 1fr',
                    marginBottom: 0,
                  }}
                >
                  <Form.Control
                    type="text"
                    name="searchTerm"
                    autoComplete="off"
                    placeholder="search exercises..."
                    value={values.searchTerm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      gridColumn: '1 / 4',
                      gridRow: '1 / 2',
                    }}
                  />
                  <img
                    src="/exitIcon.svg"
                    id="clear"
                    alt="clear text icon"
                    style={{
                      gridColumn: '3 / 4',
                      gridRow: '1 / 2',
                      placeSelf: 'center',
                    }}
                    onClick={() => resetForm(true)}
                  />
                </Form.Group>
              </Form>
              {results && values.searchTerm.length > 0 && (
                <ul>
                  {results.map(exercise => (
                    <Fragment key={exercise.id}>
                      <li
                        onClick={() =>
                          setValues({
                            searchTerm: `${exercise.nameOfExercise}`,
                          })
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
                            exercise,
                            setValues,
                            setPrimaryExercise,
                            setShowExerciseForm,
                            resetForm
                          )
                        }
                      />
                      <img
                        src="/autoCompleteArrow.svg"
                        alt="autocomplete arrow"
                        id="auto-complete-arrow"
                        onClick={() =>
                          setValues({
                            searchTerm: `${exercise.nameOfExercise}`,
                          })
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
        }}
      </Formik>
    </Fragment>
  );
};

SearchBar.propTypes = {
  autoComplete: PropTypes.func.isRequired,
  searchReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

export default connect(mapStateToProps, { autoComplete, clearResults })(
  SearchBar
);
