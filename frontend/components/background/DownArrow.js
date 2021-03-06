import React, { Fragment } from 'react';

export default function DownArrow() {
  return (
    <Fragment>
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="DownArrow">
          <path
            id="Vector"
            d="M26 51C39.8071 51 51 39.8071 51 26C51 12.1929 39.8071 1 26 1C12.1929 1 1 12.1929 1 26C1 39.8071 12.1929 51 26 51Z"
            stroke="#6F6F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M16 26L26 35.9999L36 26"
            stroke="#6F6F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M26 16V35.9999"
            stroke="#6F6F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <style jsx>
        {`
          #DownArrow {
            background-color: black;
            color: green;
          }
        `}
      </style>
    </Fragment>
  );
}
