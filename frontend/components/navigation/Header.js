import React, { Fragment } from 'react';
import Hamburger from './Hamburger';
import SquatLogo from './SquatLogo';
import LH from './LH';

const Header = () => {
  return (
    <Fragment>
      <nav>
        <LH />
        <SquatLogo />
        <Hamburger />
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          background-color: black;
          width: 100%;
          justify-content: space-between;
          padding: 1rem;
          align-items: center;
        }
      `}</style>
    </Fragment>
  );
};

export default Header;
