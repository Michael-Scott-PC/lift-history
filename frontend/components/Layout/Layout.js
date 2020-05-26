import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import Header from '../navigation/Header';
import AuthenticatedNav from '../navigation/AuthenticatedNav';
// import Footer from '../layout/Footer';

const Layout = ({ children, authReducer: { jwt } }) => {
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
      {!jwt && <Header />}
      {jwt && <AuthenticatedNav />}
      {children}
      {/* <Footer /> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(Layout);
