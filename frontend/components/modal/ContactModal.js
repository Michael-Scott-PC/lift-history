import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import ContactForm from '../form/ContactForm';

const ContactModal = ({ showContactModal, setShowContactModal }) => {
  return (
    <Modal
      show={showContactModal}
      onHide={() => setShowContactModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ padding: '1rem' }}
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title className="w-100 ml-2 text-center">Contact</Modal.Title>
        <button
          className="customClose"
          style={{ color: '#fff' }}
          onClick={() => setShowContactModal(false)}
        >
          X
        </button>
      </Modal.Header>
      <ContactForm setShowContactModal={setShowContactModal} />
    </Modal>
  );
};

ContactModal.propTypes = {
  showContactModal: PropTypes.bool.isRequired,
  setShowContactModal: PropTypes.func.isRequired
};

export default ContactModal;
