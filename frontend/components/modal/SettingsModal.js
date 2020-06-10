import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import CloseButton from '../button/CloseButton';

import { logoutUser } from '../../redux/actions/authActions';

const SettingsModal = ({ show, setShow, logoutUser }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} style={{ top: '20%' }}>
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title>Settings</Modal.Title>
        <CloseButton handleOnClick={setShow} />
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li onClick={() => logoutUser()}>
            <Link href="/">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

SettingsModal.propTypes = {};

export default connect(null, { logoutUser })(SettingsModal);
