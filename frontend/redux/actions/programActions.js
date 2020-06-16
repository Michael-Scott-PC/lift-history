import strapiAPI from '../../api/strapiAPI';
import { CREATE_USER_PROGRAM } from './types';

/**
 * @description: Retrieves the exercise Id from database and returns them to be used
 * in setsAndRepsHelper.
 * @param {Object} values - Values from the AddExerciseFormik form.
 */
const getExerciseIds = async values => {
  let primaryExerciseId;
  if (values.primaryExercise) {
    const { data: primaryData } = await strapiAPI.get(
      `/exercises?nameOfExercise=${values.primaryExercise}`
    );

    primaryExerciseId = primaryData[0].id;
  }

  let secondaryExerciseId;
  if (values.secondaryExercise) {
    const { data: secondaryData } = await strapiAPI.get(
      `/exercises?nameOfExercise=${values.secondaryExercise}`
    );

    secondaryExerciseId = secondaryData[0].id;
  }

  let thirdExerciseId;
  if (values.thirdExercise) {
    const { data: thirdData } = await strapiAPI.get(
      `/exercises?nameOfExercise=${values.thirdExercise}`
    );

    thirdExerciseId = thirdData[0].id;
  }

  return [primaryExerciseId, secondaryExerciseId, thirdExerciseId];
};

/**
 * @description: The returned list becomes the value for thisDaysExercises property in
 * mapValues object in createUserProgram function.
 * @param {Object} values - Values from the AddExerciseFormik form.
 */
const setsAndRepsHelper = async values => {
  const [
    primaryExerciseId,
    secondaryExerciseId,
    thirdExerciseId,
  ] = await getExerciseIds(values);

  const fullWorkout = [];
  if (values.primaryExercise) {
    fullWorkout.push({
      exercise: { id: primaryExerciseId },
      thisSetsAndReps: values.primarySetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  if (values.secondaryExercise) {
    fullWorkout.push({
      exercise: { id: secondaryExerciseId },
      thisSetsAndReps: values.secondarySetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  if (values.thirdExercise) {
    fullWorkout.push({
      exercise: { id: thirdExerciseId },
      thisSetsAndReps: values.thirdSetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  console.log(fullWorkout);
  return fullWorkout;
};

/**
 * @description: Update user's weightlifting program.
 * @param {string} jwt - User's JavaScript Web Token.
 * @param {number} id - User's id.
 * @param {Object} values - Values from the AddExerciseFormik form.
 */
export const createUserProgram = (jwt, id, values) => async dispatch => {
  const userId = id;

  const mapValues = {
    scheduleExercise: values.pickDate,
    isSuperSet: values.isSuperSet,
    isTripleSet: values.isTripleSet,
    thisDaysExercises: await setsAndRepsHelper(values),
    users: [{ id: userId }],
  };

  console.log(mapValues);

  try {
    const res = await strapiAPI.post(`/my-programs`, mapValues, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(res);
    const { status, data } = res;

    dispatch({
      type: CREATE_USER_PROGRAM,
      payload: [status, data],
    });
  } catch (error) {
    console.log(error);
  }
};
