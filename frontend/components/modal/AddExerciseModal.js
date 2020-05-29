import css from 'styled-jsx/css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import SearchBar from '../form/SearchBar';

const AddExerciseModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      style={{ position: 'fixed', top: '5%' }}
      scrollable
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          Add Exercise
        </Modal.Title>
        <button style={{ color: '#fff' }} onClick={() => setShow(false)}>
          X
        </button>
      </Modal.Header>
      <Modal.Body>
        <SearchBar />
      </Modal.Body>
    </Modal>
  );
};

AddExerciseModal.propTypes = {};

export default AddExerciseModal;
