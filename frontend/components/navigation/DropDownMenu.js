import React, { Fragment, useState, useRef } from 'react';
import NoSSR from 'react-no-ssr';
import { motion } from 'framer-motion';

import Hamburger from './Hamburger';
import MenuLinks from './MenuLinks';
import AuthModal from '../modal/AuthModal';

const DropDownMenu = ({ setShowContactModal, showContactModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const containerRef = useRef(null);

  const sidebar = {
    open: {
      clipPath: `circle(130% at 40px 40px)`,
      backgroundColor: '#000',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: `circle(25px at 40px 40px)`,
      backgroundColor: '#fff',
      transition: {
        delay: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <Fragment>
      <NoSSR>
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          onClick={() => setIsOpen(!isOpen)}
          ref={containerRef}
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            className="background"
            variants={sidebar}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 100,
              width: '100vw',
              height: '50vh',
            }}
          >
            <Hamburger isOpen={isOpen} />
            <MenuLinks
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setShowAuthModal={setShowAuthModal}
              setShowContactModal={setShowContactModal}
              showContactModal={showContactModal}
            />
          </motion.div>
        </motion.nav>
      </NoSSR>
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />
    </Fragment>
  );
};

export default DropDownMenu;
