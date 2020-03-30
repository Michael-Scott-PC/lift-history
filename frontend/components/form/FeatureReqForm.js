import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { FaHandshake } from 'react-icons/fa';

import SubmitButton from '../button/SubmitButton';
import featureReqSchema from './schema/featureReqSchema';

import { postFeatureReq } from '../../redux/actions/featureReqActions';

const FeatureReqForm = ({ setShowFeatureReqModal, postFeatureReq }) => {
  return (
    <Formik
      validationSchema={featureReqSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          postFeatureReq(values);
          resetForm(true);
          setSubmitting(false);
          setShowFeatureReqModal(false);
        }, 400);
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        featureRequest: ''
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
        <Form noValidate className="my-5 px-4" onSubmit={handleSubmit}>
          <h5 className=" text-center">
            Always open to suggestions! <FaHandshake />
          </h5>
          <p className="mb-5">
            If you have any features you would like to see offered by this
            software, don't hesitate to let me know! I value any input that can
            make this software more valuable to anyone that uses it.
          </p>
          <Form.Group controlId="formGroupFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="enter first name"
              className="text-center"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={touched.firstName && errors.firstName}
              required
            />
            {errors.firstName && touched.firstName ? (
              <p style={{ color: 'red' }}>{errors.firstName}</p>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formGroupLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="enter last name"
              className="text-center"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.lastName && !errors.lastName}
              isInvalid={touched.lastName && errors.lastName}
              required
            />
            {errors.lastName && touched.lastName ? (
              <p style={{ color: 'red' }}>{errors.lastName}</p>
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

          <Form.Group className="mb-5" controlId="formGroupTextArea">
            <Form.Label>
              What feature(s) would you like to see added to improve your
              experience?
            </Form.Label>
            <Form.Control
              as="textarea"
              name="featureRequest"
              value={values.featureRequest}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.featureRequest && !errors.featureRequest}
              isInvalid={touched.featureRequest && errors.featureRequest}
              required
            />
            {errors.featureRequest && touched.featureRequest ? (
              <p style={{ color: 'red' }}>{errors.featureRequest}</p>
            ) : null}
          </Form.Group>
          <SubmitButton type="submit" />
        </Form>
      )}
    </Formik>
  );
};

FeatureReqForm.propTypes = {
  postFeatureReq: PropTypes.func.isRequired
};

export default connect(null, { postFeatureReq })(FeatureReqForm);
