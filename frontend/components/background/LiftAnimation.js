import React, { useEffect } from 'react';

const LiftHisAnimation = () => {
  const getPathLengths = () => {
    const logo = document.querySelectorAll('#logo path');
    // console.log(logo);

    // for (let i = 0; i < logo.length; i++) {
    //   console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
    // }
  };

  useEffect(() => {
    getPathLengths();
  }, []);

  return (
    <div id="logo-container">
      <svg
        id="logo"
        width="233"
        height="49"
        viewBox="0 0 233 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.52344 33.8125H21.6953V37.4922H1V3.36719H5.52344V33.8125Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M30.8594 37.4922H26.5234V12.1328H30.8594V37.4922ZM26.1719 5.40625C26.1719 4.70312 26.3828 4.10938 26.8047 3.625C27.2422 3.14062 27.8828 2.89844 28.7266 2.89844C29.5703 2.89844 30.2109 3.14062 30.6484 3.625C31.0859 4.10938 31.3047 4.70312 31.3047 5.40625C31.3047 6.10938 31.0859 6.69531 30.6484 7.16406C30.2109 7.63281 29.5703 7.86719 28.7266 7.86719C27.8828 7.86719 27.2422 7.63281 26.8047 7.16406C26.3828 6.69531 26.1719 6.10938 26.1719 5.40625Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M39.9531 37.4922V15.4844H35.9453V12.1328H39.9531V9.53125C39.9531 6.8125 40.6797 4.71094 42.1328 3.22656C43.5859 1.74219 45.6406 1 48.2969 1C49.2969 1 50.2891 1.13281 51.2734 1.39844L51.0391 4.91406C50.3047 4.77344 49.5234 4.70312 48.6953 4.70312C47.2891 4.70312 46.2031 5.11719 45.4375 5.94531C44.6719 6.75781 44.2891 7.92969 44.2891 9.46094V12.1328H49.7031V15.4844H44.2891V37.4922H39.9531Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M60.3906 5.99219V12.1328H65.125V15.4844H60.3906V31.2109C60.3906 32.2266 60.6016 32.9922 61.0234 33.5078C61.4453 34.0078 62.1641 34.2578 63.1797 34.2578C63.6797 34.2578 64.3672 34.1641 65.2422 33.9766V37.4922C64.1016 37.8047 62.9922 37.9609 61.9141 37.9609C59.9766 37.9609 58.5156 37.375 57.5312 36.2031C56.5469 35.0312 56.0547 33.3672 56.0547 31.2109V15.4844H51.4375V12.1328H56.0547V5.99219H60.3906Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M109.023 37.4922H104.5V21.7188H87.2969V37.4922H82.7969V3.36719H87.2969V18.0391H104.5V3.36719H109.023V37.4922Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M121.047 37.4922H116.711V12.1328H121.047V37.4922ZM116.359 5.40625C116.359 4.70312 116.57 4.10938 116.992 3.625C117.43 3.14062 118.07 2.89844 118.914 2.89844C119.758 2.89844 120.398 3.14062 120.836 3.625C121.273 4.10938 121.492 4.70312 121.492 5.40625C121.492 6.10938 121.273 6.69531 120.836 7.16406C120.398 7.63281 119.758 7.86719 118.914 7.86719C118.07 7.86719 117.43 7.63281 116.992 7.16406C116.57 6.69531 116.359 6.10938 116.359 5.40625Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M142.773 30.7656C142.773 29.5938 142.328 28.6875 141.438 28.0469C140.562 27.3906 139.023 26.8281 136.82 26.3594C134.633 25.8906 132.891 25.3281 131.594 24.6719C130.312 24.0156 129.359 23.2344 128.734 22.3281C128.125 21.4219 127.82 20.3438 127.82 19.0938C127.82 17.0156 128.695 15.2578 130.445 13.8203C132.211 12.3828 134.461 11.6641 137.195 11.6641C140.07 11.6641 142.398 12.4062 144.18 13.8906C145.977 15.375 146.875 17.2734 146.875 19.5859H142.516C142.516 18.3984 142.008 17.375 140.992 16.5156C139.992 15.6562 138.727 15.2266 137.195 15.2266C135.617 15.2266 134.383 15.5703 133.492 16.2578C132.602 16.9453 132.156 17.8438 132.156 18.9531C132.156 20 132.57 20.7891 133.398 21.3203C134.227 21.8516 135.719 22.3594 137.875 22.8438C140.047 23.3281 141.805 23.9062 143.148 24.5781C144.492 25.25 145.484 26.0625 146.125 27.0156C146.781 27.9531 147.109 29.1016 147.109 30.4609C147.109 32.7266 146.203 34.5469 144.391 35.9219C142.578 37.2812 140.227 37.9609 137.336 37.9609C135.305 37.9609 133.508 37.6016 131.945 36.8828C130.383 36.1641 129.156 35.1641 128.266 33.8828C127.391 32.5859 126.953 31.1875 126.953 29.6875H131.289C131.367 31.1406 131.945 32.2969 133.023 33.1562C134.117 34 135.555 34.4219 137.336 34.4219C138.977 34.4219 140.289 34.0938 141.273 33.4375C142.273 32.7656 142.773 31.875 142.773 30.7656Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M158.641 5.99219V12.1328H163.375V15.4844H158.641V31.2109C158.641 32.2266 158.852 32.9922 159.273 33.5078C159.695 34.0078 160.414 34.2578 161.43 34.2578C161.93 34.2578 162.617 34.1641 163.492 33.9766V37.4922C162.352 37.8047 161.242 37.9609 160.164 37.9609C158.227 37.9609 156.766 37.375 155.781 36.2031C154.797 35.0312 154.305 33.3672 154.305 31.2109V15.4844H149.688V12.1328H154.305V5.99219H158.641Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M166.844 24.5781C166.844 22.0938 167.328 19.8594 168.297 17.875C169.281 15.8906 170.641 14.3594 172.375 13.2812C174.125 12.2031 176.117 11.6641 178.352 11.6641C181.805 11.6641 184.594 12.8594 186.719 15.25C188.859 17.6406 189.93 20.8203 189.93 24.7891V25.0938C189.93 27.5625 189.453 29.7812 188.5 31.75C187.562 33.7031 186.211 35.2266 184.445 36.3203C182.695 37.4141 180.68 37.9609 178.398 37.9609C174.961 37.9609 172.172 36.7656 170.031 34.375C167.906 31.9844 166.844 28.8203 166.844 24.8828V24.5781ZM171.203 25.0938C171.203 27.9062 171.852 30.1641 173.148 31.8672C174.461 33.5703 176.211 34.4219 178.398 34.4219C180.602 34.4219 182.352 33.5625 183.648 31.8438C184.945 30.1094 185.594 27.6875 185.594 24.5781C185.594 21.7969 184.93 19.5469 183.602 17.8281C182.289 16.0938 180.539 15.2266 178.352 15.2266C176.211 15.2266 174.484 16.0781 173.172 17.7812C171.859 19.4844 171.203 21.9219 171.203 25.0938Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M207.625 16.0234C206.969 15.9141 206.258 15.8594 205.492 15.8594C202.648 15.8594 200.719 17.0703 199.703 19.4922V37.4922H195.367V12.1328H199.586L199.656 15.0625C201.078 12.7969 203.094 11.6641 205.703 11.6641C206.547 11.6641 207.188 11.7734 207.625 11.9922V16.0234Z"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M220.352 31.1406L226.258 12.1328H230.898L220.703 41.4062C219.125 45.625 216.617 47.7344 213.18 47.7344L212.359 47.6641L210.742 47.3594V43.8438L211.914 43.9375C213.383 43.9375 214.523 43.6406 215.336 43.0469C216.164 42.4531 216.844 41.3672 217.375 39.7891L218.336 37.2109L209.289 12.1328H214.023L220.352 31.1406Z"
          stroke="black"
          strokeWidth="2"
        />
      </svg>

      <style jsx>
        {`
          #logo-container {
            width: 100%;
            text-align: center;
            position: absolute;
            top: 25%;
          }
          #logo {
            animation: fill 0.5s ease forwards 3.5s;
            stroke-linecap: square;
          }
          #logo path:nth-child(1) {
            stroke-dasharray: 109.64;
            stroke-dashoffset: 109.64;
            animation: line-anim 2s ease forwards 2.7s;
          }
          #logo path:nth-child(2) {
            stroke-dasharray: 75.55;
            stroke-dashoffset: 75.55;
            animation: line-anim 2s ease forwards;
          }
          #logo path:nth-child(3) {
            stroke-dasharray: 109.03;
            stroke-dashoffset: 109.03;
            animation: line-anim 2s ease forwards 0.3s;
          }
          #logo path:nth-child(4) {
            stroke-dasharray: 97.43;
            stroke-dashoffset: 97.43;
            animation: line-anim 2s ease forwards 0.6s;
          }
          #logo path:nth-child(5) {
            stroke-dasharray: 181.59;
            stroke-dashoffset: 181.59;
            animation: line-anim 2s ease forwards 0.9s;
          }
          #logo path:nth-child(6) {
            stroke-dasharray: 75.55;
            stroke-dashoffset: 75.55;
            animation: line-anim 2s ease forwards 1.2s;
          }
          #logo path:nth-child(7) {
            stroke-dasharray: 136.65;
            stroke-dashoffset: 136.65;
            animation: line-anim 2s ease forwards 1.5s;
          }
          #logo path:nth-child(8) {
            stroke-dasharray: 97.43;
            stroke-dashoffset: 97.43;
            animation: line-anim 2s ease forwards 1.8s;
          }
          #logo path:nth-child(9) {
            stroke-dasharray: 132.72;
            stroke-dashoffset: 132.72;
            animation: line-anim 2s ease forwards 2.1s;
          }
          #logo path:nth-child(10) {
            stroke-dasharray: 77.56;
            stroke-dashoffset: 77.56;
            animation: line-anim 2s ease forwards 2.4s;
          }
          #logo path:nth-child(11) {
            stroke-dasharray: 134.92;
            stroke-dashoffset: 134.92;
            animation: line-anim 2s ease forwards 2.7s;
          }
          @keyframes line-anim {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fill {
            from {
              fill: transparent;
            }
            to {
              fill: rgb(0, 0, 0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LiftHisAnimation;
