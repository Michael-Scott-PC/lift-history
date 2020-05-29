import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import CloseButton from '../button/CloseButton';
import FeedbackForm from '../form/FeedbackForm';

const FeedbackModal = ({ showFeedbackModal, setShowFeedbackModal }) => {
  return (
    <Modal
      show={showFeedbackModal}
      onHide={() => setShowFeedbackModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title className="w-100 text-center">Site Feedback</Modal.Title>
        <CloseButton handleOnClick={setShowFeedbackModal} />
      </Modal.Header>
      <FeedbackForm />
    </Modal>
  );
};

FeedbackModal.propTypes = {
  showFeedbackModal: PropTypes.bool.isRequired,
  setShowFeedbackModal: PropTypes.func.isRequired,
};

export default FeedbackModal;
