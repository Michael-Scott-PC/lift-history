import 'react-calendar/dist/Calendar.css';
import { AnimatePresence } from 'framer-motion';
import { wrapper } from '../redux/store';

import Layout from '../components/layout/Layout';

function MyApp(props) {
  // console.log('MyApp props: ', props);
  const { Component, pageProps, router } = props;

  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component {...pageProps} />
      </AnimatePresence>
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
