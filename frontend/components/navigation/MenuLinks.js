import React, { Fragment } from 'react';

const MenuLinks = ({ isOpen }) => {
  return (
    <Fragment>
      {isOpen && (
        <div id="menu-links">
          <ol style={{ color: '#fff' }}>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Register or Login</li>
          </ol>
        </div>
      )}

      <style jsx>{`
        #menu-links {
          height: 85%;
          display: flex;
          flex-direction: column;
        }
        ol {
          list-style: none;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      `}</style>
    </Fragment>
  );
};

export default MenuLinks;
