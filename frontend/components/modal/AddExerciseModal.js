import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import AddExerciseFormik from '../form/formik/AddExerciseFormik';
import CloseButton from '../button/CloseButton';
import SearchBar from '../form/formik/SearchBar';

const AddExerciseModal = ({ showAddExModal, setShowAddExModal }) => {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseSelected, setExercise] = useState('');
  const [localPickDate, setLocalPickDate] = useState('');

  const clearFormCloseModal = () => {
    console.log('clearFormCloseModal ran.');
    setExercise('');
    setShowExerciseForm(false);
    setShowAddExModal(false);
  };

  return (
    <Modal
      show={showAddExModal}
      onHide={() => clearFormCloseModal()}
      style={{ position: 'fixed', top: '5%' }}
      scrollable
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          Add Exercise
        </Modal.Title>
        <CloseButton handleOnClick={clearFormCloseModal} />
      </Modal.Header>
      <Modal.Body>
        <SearchBar
          setShowExerciseForm={setShowExerciseForm}
          setExercise={setExercise}
        />
        <AddExerciseFormik
          showExerciseForm={showExerciseForm}
          setShowExerciseForm={setShowExerciseForm}
          exerciseSelected={exerciseSelected}
          setExercise={setExercise}
          localPickDate={localPickDate}
          setLocalPickDate={setLocalPickDate}
          setShowAddExModal={setShowAddExModal}
        />
      </Modal.Body>
    </Modal>
  );
};

AddExerciseModal.propTypes = {
  showAddExModal: PropTypes.bool.isRequired,
  setShowAddExModal: PropTypes.func.isRequired,
};

export default AddExerciseModal;
