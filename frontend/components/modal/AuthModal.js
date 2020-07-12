import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';
import GridLoader from 'react-spinners/GridLoader';

import RegisterForm from '../form/RegisterForm';
import LoginForm from '../form/LoginForm';
import { connect } from 'react-redux';

const AuthModal = ({
  showAuthModal,
  setShowAuthModal,
  authReducer: { loading },
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Modal
      show={showAuthModal}
      onHide={() => setShowAuthModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loading && (
        <GridLoader
          color={'rgb(54, 215, 183)'}
          css="
          position: absolute;
                  width: 60px;
                  height: 60px;
                  align-self: center;
                  bottom: 50%;
                  top: 50%;
                  z-index: 10000;"
        />
      )}
      <Nav className="auth-nav-tabs" variant="tabs" defaultActiveKey="#!">
        <Nav.Item
          className="auth-nav-item col-6"
          style={{
            backgroundColor: showLogin ? '#fff' : '#000',
            boxShadow: showLogin ? null : '-5px -5px 0px 0px inset #2b2b2b',
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <Nav.Link
            href="#!"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            style={{ color: showLogin ? '#000' : '#fff', fontSize: '1.25rem' }}
            className="auth-text"
          >
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          className="auth-nav-item col-6"
          style={{
            backgroundColor: showRegister ? '#fff' : '#000',
            boxShadow: showRegister ? null : '5px -5px 0px 0px inset #2b2b2b',
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
            style={{
              color: showRegister ? '#000' : '#fff',
              fontSize: '1.25rem',
            }}
            className="auth-text"
          >
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Modal.Body>
        <Modal.Header
          style={{ borderBottom: 'none' }}
          className="auth-header"
          closeButton
        ></Modal.Header>

        <LoginForm showLogin={showLogin} setshowlogin={setShowLogin} />
        <RegisterForm
          showRegister={showRegister}
          setshowregister={setShowRegister}
        />
      </Modal.Body>
    </Modal>
  );
};

AuthModal.propTypes = {
  showAuthModal: PropTypes.bool.isRequired,
  setShowAuthModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(AuthModal);
