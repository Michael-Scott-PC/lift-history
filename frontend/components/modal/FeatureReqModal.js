import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import FeatureReqForm from '../form/FeatureReqForm';
import CloseButton from '../button/CloseButton';

const FeatureReqModal = ({ showFeatureReqModal, setShowFeatureReqModal }) => {
  return (
    <Modal
      show={showFeatureReqModal}
      onHide={() => setShowFeatureReqModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ padding: '1rem' }}
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title className="w-100 ml-2 text-center">
          Feature Request
        </Modal.Title>
        <CloseButton handleOnClick={setShowFeatureReqModal} />
      </Modal.Header>
      <FeatureReqForm setShowFeatureReqModal={setShowFeatureReqModal} />
    </Modal>
  );
};

FeatureReqModal.propTypes = {
  setShowFeatureReqModal: PropTypes.func.isRequired,
  showFeatureReqModal: PropTypes.bool.isRequired,
};

export default FeatureReqModal;
