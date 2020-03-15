import React, { Fragment } from 'react';

export default function bgPanel1() {
  return (
    <Fragment>
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 320 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="panel1-bg">
          <rect id="Rectangle 8" width="320" height="580" fill="white" />
          <path
            id="Vector 3"
            d="M320 235.878C96.6614 332.978 127.797 179.327 0 248.307V580H320V235.878Z"
            fill="url(#paint0_linear)"
          />
          <path
            id="Vector 4"
            d="M56 579.319C200.8 479.979 269.667 537.927 286 579.319H56Z"
            fill="#F4F4F4"
          />
          <g id="Group">
            <path
              id="Vector"
              d="M159 470C172.807 470 184 458.807 184 445C184 431.193 172.807 420 159 420C145.193 420 134 431.193 134 445C134 458.807 145.193 470 159 470Z"
              stroke="#6F6F6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeinejoin="round"
            />
            <path
              id="Vector_2"
              d="M149 445L159 455L169 445"
              stroke="#6F6F6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeinejoin="round"
            />
            <path
              id="Vector_3"
              d="M159 435V455"
              stroke="#6F6F6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeinejoin="round"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="160"
            y1="229.84"
            x2="160"
            y2="580"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBFBFB" />
            <stop offset="1" stopColor="#E3E3E3" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>
        {`
          svg {
            border: 5px solid red;
          }
          g {
            border: 2px solid black;
          }
        `}
      </style>
    </Fragment>
  );
}
