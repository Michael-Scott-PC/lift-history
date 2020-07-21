import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleDown, FaRegCopyright } from 'react-icons/fa';

import LiftAnimation from '../components/background/LiftAnimation';

const Home = () => {
  return (
    <div className="parent-container">
      <main id="main">
        <LiftAnimation />
        <motion.div
          className="p-container"
          style={{ marginBottom: '5rem' }}
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            style={{ fontSize: '1.45rem ' }}
            initial={{ x: -200 }}
            animate={{ x: 200 }}
            transition={{
              type: 'inertia',
              velocity: 300,
              delay: 3,
            }}
          >
            Logging made...
          </motion.p>
          <motion.p
            style={{ fontSize: '1.55rem ' }}
            initial={{ x: 450 }}
            animate={{ x: -350 }}
            transition={{ type: 'inertia', velocity: -475, delay: 3.75 }}
          >
            Simple. Easy. Convenient.
          </motion.p>
          <motion.p
            style={{ fontSize: '1.45rem ' }}
            initial={{ x: -250 }}
            animate={{ x: 250 }}
            transition={{ type: 'inertia', velocity: 350, delay: 4.75 }}
          >
            Single source of truth.
          </motion.p>
        </motion.div>
        <FaArrowCircleDown id="down" style={{ marginBottom: '5rem' }} />
      </main>

      <style jsx>
        {`
          .parent-container {
            overflow: hidden;
          }
          h1 {
            font-family: 'Archivo', sans-serif;
          }

          main {
            padding: 5rem 0;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
          }

          #main {
            width: 100vw;
            height: 100vh;
            background: url('/BgPanel3.svg');
            object-fit: cover;
          }
          .parent-container :global(#down) {
            font-size: 3rem;
            color: rgb(155, 152, 152);
          }
          .parent-container :global(#down):hover {
            color: #000;
          }
          footer {
            border: 1px solid;
            background-color: #000;
            display: flex;
            justify-content: space-between;
            padding: 2rem;
          }
          #footer-links {
            display: flex;
            flex-direction: column;
             {
              /* border: 1px solid red; */
            }
          }
          #footer-links > a {
            margin: 0.5rem;
            color: #898888;
            text-decoration: none;
          }
          #socials {
            font-size: 3rem;
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          :global(#down) {
            align-self: center;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
