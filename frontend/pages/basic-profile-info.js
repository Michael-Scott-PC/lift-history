import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';
import Alert from '../components/form/Alert';
import PublicFooter from '../components/layout/PublicFooter';
import BasicProfileInfoForm from '../components/form/BasicProfileInfoForm';

import privateRoute from '../components/hocs/privateRoute';
import { createProfile, attachProfile } from '../redux/actions/profileActions';

const BasicProfileInfo = ({
  authReducer,
  profileReducer,
  createProfile,
  attachProfile,
}) => {
  const { id } = profileReducer.profile;

  const profileHelper = id => {
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
      <PublicFooter />
    </Layout>
  );
};

BasicProfileInfo.propTypes = {
  authReducer: PropTypes.object.isRequired,
  profileReducer: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  attachProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer,
});

const PrivateBasicProfileInfo = privateRoute(BasicProfileInfo);

export default connect(mapStateToProps, { createProfile, attachProfile })(
  PrivateBasicProfileInfo
);
