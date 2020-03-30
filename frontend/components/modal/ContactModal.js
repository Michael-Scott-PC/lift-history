import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import ContactForm from '../form/ContactForm';

const ContactModal = ({ show, setShowContactModal }) => {
  console.log(show);
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

ContactModal.propTypes = {};

export default ContactModal;
