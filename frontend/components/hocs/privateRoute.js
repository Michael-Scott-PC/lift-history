// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import Router from 'next/router';
// import { request } from 'graphql-request';
// import useSWR from 'swr';
// import BounceLoader from 'react-spinners/BounceLoader';
// // import PropTypes from 'prop-types';

// import { revalidateMyProgram } from '../../redux/actions/programActions';

// export default function privateRoute(
//   WrappedComponent,
//   createProfile,
//   attachProfile
// ) {
//   const AuthenticatedComponent = ({
//     authReducer,
//     profileReducer,
//     programReducer,
//     createProfile,
//     attachProfile,
//     revalidateMyProgram,
//     ...props
//   }) => {
//     console.log('AuthenticatedComponent ran.');
//     const { profile, profileError } = profileReducer;
//     const { allPrograms } = programReducer;
//     const { id: userId, jwt } = authReducer;
//     console.log('privateRoute userId: ', userId);
//     console.log('privateRoute jwt: ', jwt);

//     // const { data, error, isValidating } = useSWR(
//     //   [`${process.env.strapiAPI}/graphql`, jwt, userId],
//     //   (url, jwt, userId) => revalidateMyProgram(url, jwt, userId)
//     // );
//     // console.log('data: ', data);

//     if (jwt) {
//       return (
//         <WrappedComponent
//           profile={profile}
//           allPrograms={allPrograms}
//           attachProfile={attachProfile}
//           createProfile={createProfile}
//           authReducer={authReducer}
//           remainingProps={props}
//           // dataSWR={data}
//         />
//       );
//     }
//     return (
//       <div>
//         <p>It appears you are not logged in.</p>
//       </div>
//     );
//   };

//   const mapStateToProps = state => ({
//     authReducer: state.authReducer,
//     profileReducer: state.profileReducer,
//     programReducer: state.programReducer,
//   });

//   return connect(mapStateToProps, { revalidateMyProgram })(
//     AuthenticatedComponent
//   );
// }

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
    programReducer,
    createProfile,
    attachProfile,
    revalidateMyProgram,
    ...props
  }) => {
    console.log('privateRoute props: ', props);
    console.log('AuthenticatedComponent ran.');
    const { profile, profileError } = profileReducer;
    const { allPrograms } = programReducer;
    const { id: userId, jwt } = authReducer;
    console.log('privateRoute userId: ', userId);
    console.log('privateRoute jwt: ', jwt);

    // const { data, error, isValidating } = useSWR(
    //   [`${process.env.strapiAPI}/graphql`, jwt, userId],
    //   (url, jwt, userId) => revalidateMyProgram(url, jwt, userId)
    // );
    // console.log('data: ', data);

    if (jwt) {
      return (
        <WrappedComponent
          profile={profile}
          allPrograms={allPrograms}
          attachProfile={attachProfile}
          createProfile={createProfile}
          authReducer={authReducer}
          remainingProps={props}
          // dataSWR={data}
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
    programReducer: state.programReducer,
  });

  return connect(mapStateToProps, { revalidateMyProgram })(
    AuthenticatedComponent
  );
}
