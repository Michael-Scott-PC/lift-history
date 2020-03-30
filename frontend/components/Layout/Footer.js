import React, { useState } from 'react';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa';
import FeedbackModal from '../modal/FeedbackModal';
import ContactModal from '../modal/ContactModal';

const Footer = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <footer>
      <FeedbackModal
        show={showFeedbackModal}
        setShowFeedbackModal={setShowFeedbackModal}
      />
      <ContactModal
        show={showContactModal}
        setShowContactModal={setShowContactModal}
      />
      <div id="footer-links">
        <Link href="/about">
          <a>About</a>
        </Link>

        <a onClick={() => setShowContactModal(!showContactModal)}>Contact</a>
        <a onClick={() => setShowFeedbackModal(!showFeedbackModal)}>
          Site Feedback
        </a>

        <Link href="/feature-request">
          <a>Feature Request</a>
        </Link>
        <p style={{ color: '#898888', marginTop: '.5rem' }}>
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

      <style jsx>
        {`
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
        `}
      </style>
    </footer>
  );
};

export default Footer;
