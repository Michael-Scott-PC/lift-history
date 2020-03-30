import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import FeedbackForm from '../form/FeedbackForm';

const FeedbackModal = ({
  show,
  setShowFeedbackModal,
  feedbackReducer: { feedback, error }
}) => {
  //   Modal.setAppElement('#__next');
  const [open, setOpen] = useState(false);

  // console.log(feedback);
  // console.log(error);

  const closeModal = () => {
    document.getElementById('__next').style.filter = 'none';
    setShowFeedbackModal(false);
    setOpen(false);
  };

  useEffect(() => {
    if (show === true) {
      setOpen(true);
      document.getElementById('__next').style.filter = 'blur(5px)';
    }

    if (feedback.length > 1 || error.length > 1) {
      closeModal();
    }
  }, [show, feedback, error]);

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

const mapStateToProps = state => ({
  feedbackReducer: state.feedbackReducer,
  alertReducer: state.alertReducer
});

export default connect(mapStateToProps)(FeedbackModal);
