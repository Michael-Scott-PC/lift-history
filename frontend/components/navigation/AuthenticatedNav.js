import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SquatLogo from '../logos/SquatLogo';
import SettingsModal from '../modal/SettingsModal';

const AuthenticatedNav = props => {
  const [show, setShow] = useState(false);
  return (
    <nav>
      <button onClick={() => setShow(!show)} className="settingsBtn">
        <img src="/settingsIcon.svg" alt="settings icon" />
      </button>
      <SettingsModal show={show} setShow={setShow} />
      <Link href="/">
        <a>
          <SquatLogo />
        </a>
      </Link>
      <img src="/messageIcon.svg" alt="message icon" className="mr-2" />

      <style jsx>{`
        nav {
          display: flex;
          background-color: black;
          width: 100%;
          justify-content: space-between;
          padding: 1rem;
          align-items: center;
        }
        .settingsBtn {
          border: none;
          background-color: #000;
        }
      `}</style>
    </nav>
  );
};

AuthenticatedNav.propTypes = {};

export default AuthenticatedNav;
