import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProfile, attachProfile } from '../redux/actions/profileActions';

const profile = ({
  authReducer,
  profileReducer,
  createProfile,
  attachProfile
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
    <div>
      <h1>PROFILE</h1>
    </div>
  );
};

profile.propTypes = {
  authReducer: PropTypes.object.isRequired,
  profileReducer: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  attachProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer
});

export default connect(mapStateToProps, { createProfile, attachProfile })(
  profile
);
