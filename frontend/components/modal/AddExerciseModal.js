import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import CloseButton from '../button/CloseButton';
import SearchBar from '../form/formik/SearchBar';

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
        <CloseButton handleOnClick={setShow} />
      </Modal.Header>
      <Modal.Body>
        <SearchBar />
      </Modal.Body>
    </Modal>
  );
};

AddExerciseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default AddExerciseModal;
