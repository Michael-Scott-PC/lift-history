import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BasicProfileInfoForm from '../components/form/BasicProfileInfoForm';

import privateRoute from '../components/hocs/privateRoute';
import { createProfile, attachProfile } from '../redux/actions/profileActions';

const BasicProfileInfo = ({
  createProfile,
  attachProfile,
  authReducer,
  profile,
}) => {
  const [count, setCount] = useState(0);

  const { id: profileId } = profile;
  const { id: userId, jwt } = authReducer;

  const profileHelper = () => {
    if (profileId) {
      attachProfile(userId, profileId, jwt);
    }
  };

  useEffect(() => {
    if (count < 1) {
      createProfile(jwt);
      setCount(count + 1);
    }
    profileHelper(profileId);
  }, [profileId]);

  return (
    <>
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
    </>
  );
};

BasicProfileInfo.propTypes = {
  authReducer: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  attachProfile: PropTypes.func.isRequired,
};

const PrivateBasicProfileInfo = privateRoute(
  BasicProfileInfo,
  createProfile,
  attachProfile
);

export default connect(null, { createProfile, attachProfile })(
  PrivateBasicProfileInfo
);
