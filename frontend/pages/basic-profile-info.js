import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';
// import Alert from '../components/form/Alert';
import BasicProfileInfoForm from '../components/form/BasicProfileInfoForm';

import privateRoute from '../components/hocs/privateRoute';
import { createProfile, attachProfile } from '../redux/actions/profileActions';

const BasicProfileInfo = ({
  createProfile,
  attachProfile,
  authReducer,
  profile,
}) => {
  console.log(createProfile);
  console.log(attachProfile);
  console.log('BasicProfileInfo component.');
  const { id } = profile;

  const profileHelper = id => {
    console.log(id);
    if (id) {
      attachProfile(authReducer.id, id, authReducer.jwt);
    } else {
      createProfile(authReducer.jwt);
    }
  };

  useEffect(() => {
    profileHelper(id);
  }, [id]);

  return (
    <Layout>
      <div
        id="basis-profile-info"
        style={{
          padding: '2rem 2rem 2rem 2rem',
          marginTop: '3rem',
          marginBottom: '3rem',
        }}
      >
        <h4 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Basic Profile Information
        </h4>
        <BasicProfileInfoForm />
      </div>
    </Layout>
  );
};

BasicProfileInfo.propTypes = {
  authReducer: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  attachProfile: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   authReducer: state.authReducer,
//   profileReducer: state.profileReducer,
// });

const PrivateBasicProfileInfo = privateRoute(
  BasicProfileInfo,
  createProfile,
  attachProfile
);

export default connect(null, { createProfile, attachProfile })(
  PrivateBasicProfileInfo
);
