import * as yup from 'yup';

export default yup.object({
  option1: yup.bool(),
  option2: yup.bool(),
  option3: yup.bool(),
  feedback: yup
    .string()
    .min(
      10,
      'It would be greatly appreciated if your feedback is at least 10 characters long.'
    )
    .max(
      500,
      'The feedback form has a 500 character limit. If your feedback exceeds this, please email: msenochs@gmail.com'
    )
    .required('Please enter your feedback.')
});
