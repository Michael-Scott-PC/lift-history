import React, { Fragment } from 'react';
import { motion, useCycle } from 'framer-motion';

export default function Hamburger() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
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
      <button onClick={() => toggleOpen()}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="hamburger">
            <circle id="Ellipse 1" cx="22" cy="22" r="22" fill="white" />
            <rect
              id="Rectangle-2"
              x="10"
              y="10"
              width="24"
              height="5"
              rx="2.5"
              fill="black"
              className={isOpen ? 'open-2' : 'closed'}
            />
            <rect
              id="Rectangle-3"
              x="10"
              y="29"
              width="24"
              height="5"
              rx="2.5"
              fill="black"
              className={isOpen ? 'open-3' : 'closed'}
            />
            <rect
              id="Rectangle-4"
              x="10"
              y="19"
              width="24"
              height="5"
              rx="3"
              fill="black"
              className={isOpen ? 'open-4' : 'closed'}
            />
          </g>
        </svg>
      </button>

      <style jsx>
        {`
          button {
            border: none;
            background-color: #000;
          }
          .open-2 {
            transform: rotate(45deg) translate(10px, -13px);
          }
          .open-3 {
            transform: rotate(-45deg) translate(-22px, 0px);
          }
          .open-4 {
            display: none;
          }
        `}
      </style>
    </Fragment>
  );
}
