import React from 'react';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

const PrivateFooter = props => {
  return (
    <nav>
      <div id="footer-nav">
        <img src="/homeIcon.svg" id="home" />
        <img src="/profileIcon.svg" id="profile" />
        <img src="/addIcon.svg" id="add" />
        <img src="/searchExerciseIcon.svg" id="search" />
        <img src="/calendarIcon.svg" id="calendar" />
      </div>
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
