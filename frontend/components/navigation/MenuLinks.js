import React, { Fragment, useState } from 'react';
import Link from 'next/link';

const MenuLinks = ({
  isOpen,
  setIsOpen,
  setShowAuthModal,
  setShowContactModal,
  showContactModal,
}) => {
  const handleAuthClick = () => {
    setIsOpen(false);
    setShowAuthModal(true);
  };

  return (
    <Fragment>
      {isOpen && (
        <div id="menu-links">
          <ol>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li onClick={() => setShowContactModal(!showContactModal)}>
              Contact
            </li>
            <li onClick={() => handleAuthClick()}>Register or Login</li>
          </ol>
        </div>
      )}

      <style jsx>{`
        #menu-links {
          height: 85%;
          display: flex;
          flex-direction: column;
        }
        li > a {
          color: #fff;
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
