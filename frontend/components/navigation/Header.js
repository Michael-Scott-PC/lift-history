import React, { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import DropDownMenu from './DropDownMenu';
import SquatLogo from './SquatLogo';
import LH from './LH';

const Header = ({ setShowContactModal, showContactModal }) => {
  return (
    <Fragment>
      <nav>
        <DropDownMenu
          setShowContactModal={setShowContactModal}
          showContactModal={showContactModal}
        />
        <Link href="/">
          <a>
            <SquatLogo />
          </a>
        </Link>
        <Link href="/">
          <a>
            <LH />
          </a>
        </Link>
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
