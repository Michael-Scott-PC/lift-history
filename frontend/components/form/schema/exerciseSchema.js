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
  isSuperSet: yup.boolean(),
  isTripleSet: yup.boolean(),
  secondarySetsAndReps: yup.array().when(['isSuperSet', 'isTripleSet'], {
    is: (isSuperSet, isTripleSet) => isSuperSet || isTripleSet,
    then: yup.array(
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
  }),
  thirdSetsAndReps: yup.array().when('isTripleSet', {
    is: true,
    then: yup.array(
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
  }),
});
