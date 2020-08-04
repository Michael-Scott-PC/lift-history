import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import AutoCompleteListNEW from './AutoCompleteListNEW';

import { autoComplete } from '../../../redux/actions/searchActions';

const SearchBarNEW = props => {
  const {
    autoComplete,
    searchReducer: { results },
    setFieldValue,
    setShowExerciseForm,
    values,
    whichValue,
  } = props;

  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const searchTermHelper = e => {
    setLocalSearchTerm(e.target.value);
    setFieldValue('searchTerm', localSearchTerm);
  };

  useEffect(() => {
    if (localSearchTerm.length > 0) {
      autoComplete(localSearchTerm);
    }
  }, [localSearchTerm]);

  return (
    <>
      <Form.Group
        controlId="formGroupSearch"
        style={{
          display: 'grid',
          // gridTemplateColumns: '3fr 3fr 1fr',
          gridTemplateColumns: 'repeat(12, minmax(0px, 1fr))',
          marginBottom: 0,
          gridColumn: '1 / 13',
          marginTop: '.75rem',
        }}
      >
        <Form.Control
          type="text"
          name="searchTerm"
          value={(values.searchTerm = localSearchTerm)}
          onChange={e => searchTermHelper(e)}
          //   onBlur={handleBlur}
          autoComplete="off"
          placeholder="search exercises..."
          style={{
            gridColumn: '1 / 13',
            gridRow: '1 / 2',
          }}
        />
        <img
          src="/exitIcon.svg"
          id="clear"
          alt="clear text icon"
          style={{
            gridColumn: '11 / 13',
            gridRow: '1 / 2',
            placeSelf: 'center',
          }}
          //   onClick={() => resetForm(true)}
          // onClick={() => setFieldValue('searchTerm', '')}
        />
      </Form.Group>
      <AutoCompleteListNEW
        results={results}
        values={values}
        setFieldValue={setFieldValue}
        setShowExerciseForm={setShowExerciseForm}
        whichValue={whichValue}
      />
    </>
  );
};

SearchBarNEW.propTypes = {};

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
});

export default connect(mapStateToProps, { autoComplete })(SearchBarNEW);
