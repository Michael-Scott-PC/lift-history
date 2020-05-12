import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import { autoComplete } from '../../redux/actions/searchActions';

const SearchBar = ({ autoComplete, searchReducer: { results } }) => {
  // const { results } = searchReducer;
  console.log(results);
  return (
    <Formik
      onSubmit={console.log}
      //   onSubmit={(values, { setSubmitting, resetForm }) => {
      //     setTimeout(() => {
      //       searchTerm(values);
      //       setSubmitting(false);
      //       resetForm(true);
      //     }, 400);
      //   }}
      initialValues={{
        searchTerm: '',
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, resetForm }) => {
        // const autoComplete = values => {
        //   console.log(values.searchTerm);
        // };
        console.log(values.searchTerm);

        if (values.searchTerm) {
          autoComplete(values.searchTerm);
        }
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              controlId="formGroupSearch"
              style={{ display: 'grid', gridTemplateColumns: '3fr 3fr 1fr' }}
            >
              <Form.Control
                type="text"
                name="searchTerm"
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
                src="./exitIcon.svg"
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
        );
      }}
    </Formik>
  );
};

SearchBar.propTypes = {};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

export default connect(mapStateToProps, { autoComplete })(SearchBar);
