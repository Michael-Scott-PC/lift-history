import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

import SubmitButton from '../button/SubmitButton';

import profileSchema from './schema/profileSchema';

import { updateProfile } from '../../redux/actions/profileActions';

const BasicProfileInfoForm = ({
  authReducer,
  profileReducer: { profile },
  updateProfile
}) => {
  console.log(authReducer);
  console.log(profile);

  return (
    <Formik
      validationSchema={profileSchema}
      //   onSubmit={console.log}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          updateProfile(values, authReducer.jwt, authReducer.id, profile.id);
          resetForm(true);
          setSubmitting(false);
        }, 400);
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        birthday: '',
        bio: '',
        coach: false,
        personalTrainer: false,
        hsAthlete: false,
        collegeAthlete: false,
        bodybuilder: false,
        powerlifter: false,
        olylifter: false,
        crossfitter: false,
        noneOfTheAbove: false
      }}
    >
      {({
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group
            controlId="formGroupFirstName"
            style={{
              display: 'grid',
              marginTop: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <Form.Label style={{ fontFamily: "'Cantarell', sans-serif" }}>
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="enter first name"
              style={{
                width: '75%',
                margin: 'auto',
                border: '1px solid rgb(208, 208, 208)',
                textAlign: 'center'
              }}
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={touched.firstName && errors.firstName}
              required
            />
            {errors.firstName && touched.firstName ? (
              <p style={{ color: 'red', width: '75%', margin: 'auto' }}>
                {errors.firstName}
              </p>
            ) : null}
          </Form.Group>

          <Form.Group
            controlId="formGroupLastName"
            style={{
              display: 'grid',
              marginTop: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <Form.Label style={{ fontFamily: "'Cantarell', sans-serif" }}>
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="enter last name"
              style={{
                width: '75%',
                margin: 'auto',
                border: '1px solid rgb(208, 208, 208)',
                textAlign: 'center'
              }}
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.lastName && !errors.lastName}
              isInvalid={touched.lastName && errors.lastName}
              required
            />
            {errors.lastName && touched.lastName ? (
              <p style={{ color: 'red', width: '75%', margin: 'auto' }}>
                {errors.lastName}
              </p>
            ) : null}
          </Form.Group>
          <Form.Group
            style={{
              display: 'grid',
              marginTop: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <Form.Label style={{ fontFamily: "'Cantarell', sans-serif" }}>
              Birthday
            </Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              style={{
                width: '75%',
                margin: 'auto',
                border: '1px solid rgb(208, 208, 208)',
                textAlign: 'center',
                color: '#808080'
              }}
              value={values.birthday}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.birthday && !errors.birthday}
              isInvalid={touched.birthday && errors.birthday}
              required
            />
            <Form.Text
              className="text-muted"
              style={{ width: '75%', margin: 'auto' }}
            >
              By default, this information is private.
            </Form.Text>
            {errors.birthday && touched.birthday ? (
              <p style={{ color: 'red', width: '75%', margin: 'auto' }}>
                {errors.birthday}
              </p>
            ) : null}
          </Form.Group>

          <Form.Group
            style={{
              display: 'grid',
              marginTop: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <Form.Label style={{ fontFamily: "'Cantarell', sans-serif" }}>
              Bio
            </Form.Label>
            <Form.Control
              as="textarea"
              row="3"
              name="bio"
              placeholder="optional"
              style={{
                width: '75%',
                margin: 'auto',
                border: '1px solid rgb(208, 208, 208)'
              }}
              value={values.bio}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.bio && !errors.bio}
              isInvalid={touched.bio && errors.bio}
              required
            />
            <Form.Text
              className="text-muted"
              style={{ width: '75%', margin: 'auto' }}
            >
              Up to 150 characters.
            </Form.Text>
            {errors.bio && touched.bio ? (
              <p style={{ color: 'red', width: '75%', margin: 'auto' }}>
                {errors.bio}
              </p>
            ) : null}
          </Form.Group>

          <Form.Label style={{ fontFamily: "'Cantarell', sans-serif" }}>
            I am a:
          </Form.Label>
          <Form.Text
            className="text-muted"
            style={{ width: '75%', marginTop: '0', marginBottom: '1rem' }}
          >
            (Check all that apply)
          </Form.Text>
          <Form.Check
            type="checkbox"
            label="coach"
            name="coach"
            value={values.coach}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="personal trainer"
            name="personalTrainer"
            value={values.personalTrainer}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="high school athlete"
            name="hsAthlete"
            value={values.hsAthlete}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="college athlete"
            name="collegeAthlete"
            value={values.collegeAthlete}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="bodybuilder"
            name="bodybuilder"
            value={values.bodybuilder}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="powerlifter"
            name="powerlifter"
            value={values.powerlifter}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="olympic lifter"
            name="olylifter"
            value={values.olylifter}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="crossfitter"
            name="crossfitter"
            value={values.crossfitter}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="none of the above"
            name="noneOfTheAbove"
            value={values.noneOfTheAbove}
            onChange={handleChange}
          />

          <SubmitButton className="mt-4 mb-5" type="submit">
            Submit
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

BasicProfileInfoForm.propTypes = {
  authReducer: PropTypes.object.isRequired,
  profileReducer: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer
});

export default connect(mapStateToProps, { updateProfile })(
  BasicProfileInfoForm
);
