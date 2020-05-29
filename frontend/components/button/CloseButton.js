import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ handleOnClick }) => {
  return (
    <button
      className="customClose"
      style={{ color: '#fff', backgroundColor: '#000', border: 'none' }}
      onClick={() => handleOnClick(false)}
    >
      X
    </button>
  );
};

CloseButton.propTypes = {};

export default CloseButton;
