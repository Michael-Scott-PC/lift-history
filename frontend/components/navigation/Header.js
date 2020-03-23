import React, { Fragment } from 'react';
import Link from 'next/link';

import Hamburger from './Hamburger';
import SquatLogo from './SquatLogo';
import LH from './LH';

const Header = () => {
  return (
    <Fragment>
      <nav>
        <Link href="/">
          <a>
            <LH />
          </a>
        </Link>
        <Link href="/">
          <a>
            <SquatLogo />
          </a>
        </Link>
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
