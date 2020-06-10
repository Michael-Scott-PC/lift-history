import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import ContactModal from '../modal/ContactModal';
import FeedbackModal from '../modal/FeedbackModal';
import FeatureReqModal from '../modal/FeatureReqModal';

import Header from '../navigation/Header';
import AuthenticatedNav from '../navigation/AuthenticatedNav';
import PublicFooter from '../layout/PublicFooter';
import PrivateFooter from './PrivateFooter';

const Layout = ({ children, authReducer }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFeatureReqModal, setShowFeatureReqModal] = useState(false);

  // console.log(authReducer);
  const { jwt } = authReducer;

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
      {!jwt && (
        <Header
          setShowContactModal={setShowContactModal}
          showContactModal={showContactModal}
        />
      )}
      {jwt && <AuthenticatedNav />}
      {children}
      {!jwt && (
        <PublicFooter
          setShowContactModal={setShowContactModal}
          showContactModal={showContactModal}
          setShowFeatureReqModal={setShowFeatureReqModal}
          showFeatureReqModal={showFeatureReqModal}
          setShowFeedbackModal={setShowFeedbackModal}
          showFeedbackModal={showFeedbackModal}
        />
      )}
      {jwt && <PrivateFooter />}
      <FeedbackModal
        showFeedbackModal={showFeedbackModal}
        setShowFeedbackModal={setShowFeedbackModal}
      />
      <ContactModal
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />
      <FeatureReqModal
        showFeatureReqModal={showFeatureReqModal}
        setShowFeatureReqModal={setShowFeatureReqModal}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(Layout);
