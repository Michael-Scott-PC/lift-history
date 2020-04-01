import React, { Fragment } from 'react';

export default function Hamburger({ isOpen }) {
  return (
    <Fragment>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: '18px', marginLeft: '18px' }}
      >
        <g id="hamburger">
          <rect
            id="Rectangle-2"
            x="10"
            y="12"
            width="24"
            height="4"
            rx="2.5"
            fill="black"
            className={isOpen ? 'open-2' : 'closed'}
          />
          <rect
            id="Rectangle-3"
            x="10"
            y="29"
            width="24"
            height="4"
            rx="2.5"
            fill="black"
            className={isOpen ? 'open-3' : 'closed'}
          />
          <rect
            id="Rectangle-4"
            x="10"
            y="20"
            width="24"
            height="4"
            rx="3"
            fill="black"
            className={isOpen ? 'open-4' : 'closed'}
          />
        </g>
      </svg>

      <style jsx>
        {`
          .open-2 {
            transform: rotate(45deg) translate(10px, -14px);
            fill: #fff;
          }
          .open-3 {
            transform: rotate(-45deg) translate(-22px, 0px);
            fill: #fff;
          }
          .open-4 {
            display: none;
          }
        `}
      </style>
    </Fragment>
  );
}
