import React from 'react';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

const PrivateFooter = props => {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="home"
      style={{ background: 'black' }}
    >
      <Nav.Item>
        <Nav.Link eventKey="home">Icon 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="feed">Icon 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="add">Icon 3</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="search">Icon 4</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="calendar">Icon 5</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

PrivateFooter.propTypes = {};

export default PrivateFooter;
