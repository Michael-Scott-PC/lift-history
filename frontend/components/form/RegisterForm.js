import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

import registerSchema from './schema/registerSchema';
import SubmitButton from '../button/SubmitButton';

import { registerUser, createProfile } from '../../redux/actions/authActions';

const RegisterForm = ({ showRegister, registerUser }) => {
  return (
    <Formik
      validationSchema={registerSchema}
      // onSubmit={console.log}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          registerUser(values);
          resetForm(true);
          setSubmitting(false);
          // setShowAuthModal(false);
        }, 400);
      }}
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        <Form
          noValidate
          className="py-4 px-4"
          onSubmit={handleSubmit}
          style={{ display: showRegister ? 'block' : 'none' }}
        >
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="Choose a username"
              className="text-center"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.username && !errors.username}
              isInvalid={touched.username && errors.username}
              required
            />
            {errors.username && touched.username ? (
              <p style={{ color: 'red' }}>{errors.username}</p>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="enter email"
              className="text-center"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && errors.email}
              required
            />
            {errors.email && touched.email ? (
              <p style={{ color: 'red' }}>{errors.email}</p>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="enter password"
              className="text-center"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && errors.password}
              required
            />
            {errors.password && touched.password ? (
              <p style={{ color: 'red' }}>{errors.password}</p>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formGroupConfirmPassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="re-enter password"
              className="text-center"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              isInvalid={touched.confirmPassword && errors.confirmPassword}
              required
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
            ) : null}
          </Form.Group>

          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {};

export default connect(null, { registerUser })(RegisterForm);
