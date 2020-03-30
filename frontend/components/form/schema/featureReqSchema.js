import * as yup from 'yup';

export default yup.object({
  firstName: yup
    .string()
    .min(2, 'First name field is too short.')
    .max(30, 'First name field is too long.')
    .required('Required'),
  lastName: yup
    .string()
    .min(2, 'Last name field is too short.')
    .max(30, 'Last name field is too long.')
    .required('Required'),
  email: yup
    .string()
    .email('Invalid email')
    .min(7, 'Email field is too short.')
    .max(40, 'Email field is too long.')
    .required('Required'),
  featureRequest: yup
    .string()
    .min(10, 'The feature request field needs at least 10 characters.')
    .max(
      1000,
      'The feature request field has a max of 1,000 characters. If your request exceeds this, please email: msenochs@gmail.com'
    )
    .required('Required')
});
