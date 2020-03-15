import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/navigation/Header';
import LiftAnimation from '../components/background/LiftAnimation';
import { motion } from 'framer-motion';
import { FaArrowCircleDown, FaRegCopyright } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Lift History</title>
        <link rel="icon" href="/squat-logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Archivo|Cantarell|Maven+Pro|Titillium+Web&display=swap"
        />
      </Head>

      <Header />

      <main id="main">
        <LiftAnimation />
        <div className="p-container" style={{ marginBottom: '5rem' }}>
          <motion.p
            style={{ fontSize: '1.45rem ' }}
            initial={{ x: -200 }}
            animate={{ x: 200 }}
            transition={{
              type: 'inertia',
              velocity: 275,
              delay: 3
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
        </div>
        <FaArrowCircleDown id="down" style={{ marginBottom: '5rem' }} />
      </main>

      <footer>
        <div id="footer-links">
          <Link href="#">
            <a>About</a>
          </Link>
          <Link href="#">
            <a>Contact</a>
          </Link>
          <Link href="#">
            <a>Site Feedback</a>
          </Link>
          <Link href="#">
            <a>Feature Request</a>
          </Link>
          <p style={{ color: '#898888' }}>
            <FaRegCopyright
              style={{
                color: '#898888',
                marginLeft: '.4rem',
                marginRight: '.2rem'
              }}
            />
            2020 Lift History
          </p>
        </div>
        <div id="socials">
          <img src="/twitter.svg" id="twitter" />
          <img src="/facebook.svg" id="facebook" />
          <img src="/instagram.svg" id="instagram" />
          <img src="/youtube.svg" id="youtube" />
        </div>
      </footer>

      <style jsx>
        {`
          .container {
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
          .container :global(#down) {
            font-size: 3rem;
            color: rgb(155, 152, 152);
          }
          .container :global(#down):hover {
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
           {
            /* :global(#youtube) {
            font-size: 3.5rem;
          }
          :global(#instagram) {
            border: 1px solid;
            border-radius: 32px;
            font-size: 1.6rem;
            padding: 10px;
            background-color: #000;
            color: #fff;
          } */
          }
        `}
      </style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
