import React, { Fragment } from 'react';

const MenuLinks = ({ isOpen }) => {
  return (
    <Fragment>
      {isOpen && (
        <div id="menu-links">
          <ol>
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
          color: #fff;
          text-align: center;
          padding-left: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        li {
          font-family: 'Cantarell', sans-serif;
          letter-spacing: 1px;
          font-size: 1.25rem;
        }
      `}</style>
    </Fragment>
  );
};

export default MenuLinks;
