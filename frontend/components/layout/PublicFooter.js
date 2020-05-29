import React from 'react';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa';

const PublicFooter = ({
  setShowContactModal,
  setShowFeatureReqModal,
  setShowFeedbackModal,
  showContactModal,
  showFeatureReqModal,
  showFeedbackModal,
}) => {
  return (
    <footer>
      <div id="footer-links">
        <Link href="/about">
          <a>About</a>
        </Link>

        <a onClick={() => setShowContactModal(!showContactModal)}>Contact</a>
        <a onClick={() => setShowFeedbackModal(!showFeedbackModal)}>
          Site Feedback
        </a>
        <a onClick={() => setShowFeatureReqModal(!showFeatureReqModal)}>
          Feature Request
        </a>

        <p style={{ color: '#898888', marginTop: '.5rem' }}>
          <FaRegCopyright
            style={{
              color: '#898888',
              marginLeft: '.4rem',
              marginRight: '.2rem',
            }}
          />
          2020 Lift History
        </p>
      </div>
      <div id="socials">
        <img src="/twitter.svg" id="twitter" alt="twitter icon" />
        <img src="/facebook.svg" id="facebook" alt="facebook icon" />
        <img src="/instagram.svg" id="instagram" alt="instagram icon" />
        <img src="/youtube.svg" id="youtube" alt="youtube icon" />
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

export default PublicFooter;
