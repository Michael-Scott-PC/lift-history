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
        <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
          <Modal.Title className="w-100 text-center">Site Feedback</Modal.Title>
          <button
            className="customClose"
            style={{ color: '#fff' }}
            onClick={closeModal}
          >
            X
          </button>
        </Modal.Header>
        <FeedbackForm />
      </Modal>

      <style jsx>{`
        .close {
          color: '#fff !important';
        }
      `}</style>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  feedbackReducer: state.feedbackReducer,
  alertReducer: state.alertReducer
});

export default connect(mapStateToProps)(FeedbackModal);
