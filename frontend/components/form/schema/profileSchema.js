import * as yup from 'yup';

export default yup.object({
  firstName: yup
    .string()
    .min(2, 'Sorry, the first name field must be longer.')
    .max(30, 'Sorry, last names must be shorter than 30 characters.')
    .required('This field is required.'),
  lastName: yup
    .string()
    .min(2, 'Sorry, the last name field must be longer.')
    .max(30, 'Sorry, last names must be shorter than 30 characters.')
    .required('This field is required.'),
  birthday: yup
    .string()
    .min(10)
    .max(10)
    .required('Please enter a birthday.'),
  bio: yup
    .string()
    .min(1)
    .max(150, 'Bios are limited to 150 characters.'),
  coach: yup.bool(),
  personalTrainer: yup.bool(),
  hsAthlete: yup.bool(),
  collegeAthlete: yup.bool(),
  bodybuilder: yup.bool(),
  powerlifter: yup.bool(),
  olylifter: yup.bool(),
  crossfitter: yup.bool(),
  noneOfTheAbove: yup.bool()
});
