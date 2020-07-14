import 'react-calendar/dist/Calendar.css';
import { wrapper } from '../redux/store';

import Layout from '../components/layout/Layout';

function MyApp(props) {
  // console.log('MyApp props: ', props);
  const { Component, pageProps } = props;
  return (
    <Layout>
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
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
