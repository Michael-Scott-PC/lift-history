import 'react-calendar/dist/Calendar.css';
import { Provider } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
import store from '../redux/store';
import { createWrapper } from 'next-redux-wrapper';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-color: #f0f8ff;
        }
        div#__next {
          height: 100%;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

const makeStore = context => store;

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);

// import 'react-calendar/dist/Calendar.css';
// import { Provider } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
// import store from '../redux/store';
// import createWrapper from 'next-redux-wrapper';

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Component {...pageProps} />
//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           height: 100%;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//           background-color: #f0f8ff;
//         }
//         div#__next {
//           height: 100%;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </>
//   );
// }

// const makeStore = () => store;

// const wrapper = createWrapper(makeStore, { debug: true });

// export default wrapper(withRedux(makeStore)(MyApp));
