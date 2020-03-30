import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import feedbackSchema from './schema/feedbackSchema';
import SubmitButton from '../button/SubmitButton';

import { postFeedback } from '../../redux/actions/feedbackActions';

const FeedbackForm = ({ postFeedback, alertReducer }) => {
  // console.log(props);
  // console.log(process.env.strapiAPI);

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

  return (
    <div className="feedback-container">
      <Formik
        validationSchema={feedbackSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            postFeedback(values);
            resetForm(true);
            setSubmitting(false);
          }, 400);
        }}
        initialValues={{
          lifthistory: false,
          dashboard: false,
          none: false,
          feedback: ''
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
            <Form.Group>
              <Form.Label>
                What does your feedback relate to? (select all that apply)
              </Form.Label>
              <Form.Check
                type="checkbox"
                label="lifthistory.com"
                name="lifthistory"
                value={values.lifthistory}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
              <Form.Check
                type="checkbox"
                label="The dashboard"
                name="dashboard"
                value={values.dashboard}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
              <Form.Check
                type="checkbox"
                label="None of the above"
                name="none"
                value={values.none}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Please share your feedback.</Form.Label>
              <Form.Control
                name="feedback"
                as="textarea"
                rows="3"
                value={values.feedback}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
            </Form.Group>
            <SubmitButton type="submit">Submit form</SubmitButton>
          </Form>
        )}
      </Formik>

      <style jsx>
        {`
          .feedback-container {
            padding: 1rem 2rem;
          }
        `}
      </style>
    </div>
  );
};

// FeedbackForm.propTypes = {

// }

const mapStateToProps = state => ({
  alertReducer: state.alertReducer
});

export default connect(mapStateToProps, { postFeedback })(FeedbackForm);
