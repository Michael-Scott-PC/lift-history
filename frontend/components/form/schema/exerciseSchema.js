import * as yup from 'yup';

export default yup.object({
  pickDate: yup.string().required('Please select a date.'),
  primarySetsAndReps: yup.array().of(
    yup.object().shape({
      sets: yup.string().required('Please enter the number of sets.'),
      reps: yup.string().required('Please enter the number of reps.'),
      weight: yup
        .string()
        .required(
          'Please enter a weight. If using bodyweight, please enter 0.'
        ),
    })
  ),
});
