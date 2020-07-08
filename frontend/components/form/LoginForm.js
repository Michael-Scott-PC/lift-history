import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Router from 'next/router';

import loginSchema from './schema/loginSchema';
import SubmitButton from '../button/SubmitButton';

import { loginUser } from '../../redux/actions/authActions';
import { currentYear } from '../../utils/currentDate';

const LoginForm = ({ showLogin, loginUser, alertReducer }) => {
  useEffect(() => {
    Router.prefetch('/dashboard/[year]', `/dashboard/${currentYear}`);
  }, []);

  return (
    <Formik
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          loginUser(values);
          setSubmitting(false);
          resetForm(true);
        }, 400);
      }}
      initialValues={{
        identifier: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="login-modal-component py-4 px-4"
          style={{ display: showLogin ? 'block' : 'none' }}
        >
          {alertReducer &&
            alertReducer.map(error => (
              <p
                style={{ color: `${error.alertType}` === 'danger' && 'red' }}
                key={error.id}
              >
                {error.msg}
              </p>
            ))}
          <Form.Group controlId="formGroupEmailLogin">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="identifier"
              placeholder="enter email"
              className="text-center"
              value={values.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.identifier && !errors.identifier}
              isInvalid={touched.identifier && errors.identifier}
              required
            />
            {errors.identifier && touched.identifier ? (
              <p style={{ color: 'red' }}>{errors.identifier}</p>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formGroupPasswordLogin">
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
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  alertReducer: state.alertReducer,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
