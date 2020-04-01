import React, { Fragment } from 'react';
import { motion, useCycle } from 'framer-motion';

import Hamburger from './Hamburger';
import MenuLinks from './MenuLinks';

const DropDownMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const sidebar = {
    open: {
      clipPath: `circle(125% at 40px 40px)`,
      backgroundColor: '#000',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    },
    closed: {
      clipPath: 'circle(25px at 40px 40px)',
      backgroundColor: '#fff',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <Fragment>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={() => toggleOpen()}
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
            width: '70vw',
            height: '50vh'
          }}
        >
          <Hamburger isOpen={isOpen} />
          <MenuLinks isOpen={isOpen} />
        </motion.div>
      </motion.nav>
    </Fragment>
  );
};

export default DropDownMenu;
