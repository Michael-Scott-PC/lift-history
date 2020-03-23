import React, { useEffect } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import feedbackSchema from './schema/feedbackSchema';
import SubmitButton from '../button/SubmitButton';

const FeedbackForm = props => {
  console.log(props);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div className="feedback-container">
      <Formik
        validationSchema={feedbackSchema}
        onSubmit={console.log}
        initialValues={{
          option1: false,
          option2: false,
          option3: false,
          feedback: ''
        }}
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}
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
                name="option1"
                value={values.option1}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
              <Form.Check
                type="checkbox"
                label="The dashboard"
                name="option2"
                value={values.option2}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.category && !errors.category}
                isInvalid={touched.category && errors.category}
              />
              <Form.Check
                type="checkbox"
                label="None of the above"
                name="option3"
                value={values.option3}
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

export default FeedbackForm;
