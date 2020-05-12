import css from 'styled-jsx/css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import AddExerciseForm from '../form/AddExerciseForm';

const AddExerciseModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      style={{ position: 'fixed', top: '50%' }}
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title>Add an Exercise</Modal.Title>
        <button style={{ color: '#fff' }} onClick={() => setShow(false)}>
          X
        </button>
      </Modal.Header>
      <Modal.Body>
        <AddExerciseForm />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

AddExerciseModal.propTypes = {};

export default AddExerciseModal;
