import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from '../navigation/Header';
// import Footer from '../layout/Footer';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Lift History</title>
        <link rel="icon" href="/squat-logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Archivo|Cantarell|Maven+Pro|Titillium+Web&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      {children}
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Layout;
