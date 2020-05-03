import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
// import PropTypes from 'prop-types';

export default function privateRoute(WrappedComponent) {
  const AuthenticatedComponent = ({ authReducer, profileReducer }) => {
    const { profile, error } = profileReducer;

    if (authReducer.jwt) {
      return <WrappedComponent profile={profile} />;
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
