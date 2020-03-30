import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import ContactForm from '../form/ContactForm';

const ContactModal = ({ show, setShowContactModal }) => {
  useEffect(() => {
    if (show) {
      document.getElementById('__next').style.filter = 'blur(5px)';
    }

    if (!show) {
      document.getElementById('__next').style.filter = 'none';
    }
  });

  return (
    <Modal
      show={show}
      onHide={setShowContactModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ padding: '1rem' }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Contact Form</Modal.Title>
      </Modal.Header>
      <ContactForm />
    </Modal>
  );
};

ContactModal.propTypes = {};

export default ContactModal;
