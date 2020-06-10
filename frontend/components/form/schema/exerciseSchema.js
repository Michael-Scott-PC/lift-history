import * as yup from 'yup';

export default yup.object({
  pickDate: yup.string().required(),
});
