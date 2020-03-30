import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { FaEnvelope } from 'react-icons/fa';

import SubmitButton from '../button/SubmitButton';

import contactSchema from '../form/schema/contactSchema';
import { postContact } from '../../redux/actions/contactActions';

const ContactForm = ({ postContact, setShowContactModal }) => {
  return (
    <Formik
      validationSchema={contactSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          postContact(values);
          resetForm(true);
          setSubmitting(false);
          setShowContactModal(false);
        }, 400);
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        question: ''
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
            Get in touch! <FaEnvelope />
          </h5>
          <p className="mb-5">
            If you have any questions about this product or would like to reach
            the web application developer for general questions, please fill out
            this form.
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

          <Form.Group controlId="formGroupPhoneNumber">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className="text-center"
              type="Phone"
              name="phone"
              placeholder="enter phone (optional)"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.phone && !errors.phone}
              isInvalid={touched.phone && errors.phone}
            />
            {errors.phone && touched.phone ? (
              <p style={{ color: 'red' }}>{errors.phone}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-5" controlId="formGroupTextArea">
            <Form.Label>How may I help you?</Form.Label>
            <Form.Control
              as="textarea"
              name="question"
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.question && !errors.question}
              isInvalid={touched.question && errors.question}
              required
            />
            {errors.question && touched.question ? (
              <p style={{ color: 'red' }}>{errors.question}</p>
            ) : null}
          </Form.Group>

          <SubmitButton className="mt-4 mb-5 submit-inquiry" type="submit">
            Submit
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  postContact: PropTypes.func.isRequired,
  setShowContactModal: PropTypes.func.isRequired
};

export default connect(null, { postContact })(ContactForm);
