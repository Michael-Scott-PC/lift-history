import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
// import PropTypes from 'prop-types';

export default function privateRoute(
  WrappedComponent,
  createProfile,
  attachProfile
) {
  const AuthenticatedComponent = ({
    authReducer,
    profileReducer,
    createProfile,
    attachProfile,
  }) => {
    const { profile, error } = profileReducer;
    // console.log('authReducer from privateRoute: ', authReducer);

    // console.log('profile variable from privateRoute: ', profile);

    if (authReducer.jwt) {
      // console.log('WrappedComponenet gets returned.');
      return (
        <WrappedComponent
          profile={profile}
          attachProfile={attachProfile}
          createProfile={createProfile}
          authReducer={authReducer}
        />
      );
    }
    return (
      <div>
        <p>It appears you are not logged in.</p>
      </div>
    );
  };

  const mapStateToProps = state => ({
    authReducer: state.authReducer,
    profileReducer: state.profileReducer,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
