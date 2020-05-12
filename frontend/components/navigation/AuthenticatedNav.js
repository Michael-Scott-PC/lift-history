import React from 'react';
import PropTypes from 'prop-types';

import SquatLogo from './SquatLogo';

const AuthenticatedNav = props => {
  return (
    <nav>
      <Link href="/">
        <a>
          <SquatLogo />
        </a>
      </Link>
      <Link href="/">
        <a>
          <img src="./messageIcon.svg" alt="message icon" />
        </a>
      </Link>
    </nav>
  );
};

AuthenticatedNav.propTypes = {};

export default AuthenticatedNav;
