import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

import AddExerciseModal from '../modal/AddExerciseModal';

const PrivateFooter = props => {
  const [showAddExModal, setShowAddExModal] = useState(false);

  return (
    <nav>
      <div id="footer-nav">
        <img src="/homeIcon.svg" id="home" alt="home icon" />
        <img src="/profileIcon.svg" id="profile" alt="profile icon" />
        <img
          src="/addIcon.svg"
          id="add"
          alt="add exercise icon"
          onClick={() => setShowAddExModal(true)}
        />
        <img
          src="/searchExerciseIcon.svg"
          id="search"
          alt="search exercises icon"
        />
        <img src="/calendarIcon.svg" id="calendar" alt="calendar icon" />
      </div>
      <AddExerciseModal
        showAddExModal={showAddExModal}
        setShowAddExModal={setShowAddExModal}
      />
      <style jsx>
        {`
          nav {
            position: fixed;
            bottom: 0;
            width: 100%;
          }
          #footer-nav {
            display: flex;
            justify-content: space-between;
            background-color: #0d0c0c;
            height: 10vh;
          }
        `}
      </style>
    </nav>
  );
};

PrivateFooter.propTypes = {};

export default PrivateFooter;
