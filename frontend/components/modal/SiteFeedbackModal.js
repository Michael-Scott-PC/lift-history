import React, { useState, useEffect, Fragment } from 'react';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal';
import FeedbackForm from '../form/FeedbackForm';

const SiteFeedbackModal = props => {
  //   Modal.setAppElement('#__next');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.show === true) {
      setOpen(true);
      document.getElementById('__next').style.filter = 'blur(5px)';
    }
  }, [props.show]);

  const closeModal = () => {
    document.getElementById('__next').style.filter = 'none';
    props.setShowFeedbackModal(false);
    setOpen(false);
  };

  return (
    <Fragment>
      <Modal
        show={open}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Site Feedback</Modal.Title>
        </Modal.Header>
        {/* <button onClick={() => closeModal(false)}>Close</button> */}
        <FeedbackForm />
      </Modal>
    </Fragment>
  );
};

export default SiteFeedbackModal;
