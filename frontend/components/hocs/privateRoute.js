import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { request } from 'graphql-request';
import useSWR from 'swr';
import BounceLoader from 'react-spinners/BounceLoader';
// import PropTypes from 'prop-types';

import { revalidateMyProgram } from '../../redux/actions/programActions';

export default function privateRoute(WrappedComponent) {
  const AuthenticatedComponent = ({
    authReducer,
    profileReducer,
    createProfile,
    attachProfile,
    revalidateMyProgram,
    ...props
  }) => {
    const { profile, profileError } = profileReducer;
    const { id: userId, jwt } = authReducer;

    const { data: dataSWR, error, isValidating } = useSWR(
      [`${process.env.strapiAPI}/graphql`, jwt, userId],
      (url, jwt, userId) => revalidateMyProgram(url, jwt, userId)
    );
    // console.log('dataSWR: ', dataSWR);

    if (jwt) {
      return (
        <WrappedComponent
          authReducer={authReducer}
          profile={profile}
          attachProfile={attachProfile}
          createProfile={createProfile}
          remainingProps={props}
          dataSWR={dataSWR}
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

  return connect(mapStateToProps, { revalidateMyProgram })(
    AuthenticatedComponent
  );
}
