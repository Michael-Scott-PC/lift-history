import { GraphQLClient } from 'graphql-request';

import strapiAPI from '../../api/strapiAPI';
import { CREATE_USER_PROGRAM, REVALIDATE_MYPROGRAM } from './types';

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
 * @param {bool} getExerciseId - Determines if we need to execute getExerciseIds function.
 */
export const setsAndRepsHelper = async (values, getExerciseId) => {
  // In order to successfully create or update 'myProgram', the exercise ID must be passed in the object
  // However, in order to mutate our UI with SWR, we need the exercise name, not the ID. The getExerciseId
  // param allows us to control which value is passed to 'exercise' so we don't break the rendering logic.
  let primaryExerciseId, secondaryExerciseId, thirdExerciseId;
  if (getExerciseId) {
    [
      primaryExerciseId,
      secondaryExerciseId,
      thirdExerciseId,
    ] = await getExerciseIds(values);
  }

  const fullWorkout = [];
  if (values.primaryExercise) {
    fullWorkout.push({
      exercise: !getExerciseId
        ? { nameOfExercise: values.primaryExercise }
        : { id: primaryExerciseId },
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
      exercise: !getExerciseId
        ? { nameOfExercise: values.secondaryExercise }
        : { id: secondaryExerciseId },
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
      exercise: !getExerciseId
        ? { nameOfExercise: values.thirdExercise }
        : { id: thirdExerciseId },
      thisSetsAndReps: values.thirdSetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  console.log('fullWorkout: ', fullWorkout);
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

  const getExerciseId = true;
  const mapValues = {
    scheduleExercise: values.pickDate,
    isSuperSet: values.isSuperSet,
    isTripleSet: values.isTripleSet,
    thisDaysExercises: await setsAndRepsHelper(values, getExerciseId),
    users: [{ id: userId }],
  };

  try {
    const res = await strapiAPI.post(`/my-programs`, mapValues, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    // console.log('res from createUserProgram: ', res);
    const { status, data } = res;

    dispatch({
      type: CREATE_USER_PROGRAM,
      payload: [status, data],
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description: This revalidates the users 'myPrograms' to ensure the client UI reflects their DB data.
 * @param {string} url - the backend Strapi CMS graphql endpoint.
 * @param {string} jwt - User's jwt.
 * @param {number} userId - User's id.
 */
export const revalidateMyProgram = (url, jwt, userId) => async dispatch => {
  // console.log('revalidateMyProgram ran.');
  // console.log('url: ', url);
  // console.log('jwt: ', jwt);
  // console.log('userId: ', userId);
  const query = `{
    user(id: ${userId}) {
      id
      myPrograms{
        scheduleExercise
        thisDaysExercises {
          exercise {
            nameOfExercise
          }
          thisSetsAndReps {
            sets
            reps
            weight
            rpe
            pct
            toFailure
            isWarmUp
          }
        }
        isSuperSet
        isTripleSet
        
      }
    }
  }`;

  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  try {
    const res = await graphqlClient.request(query);
    // console.log('revalidateMyProgram res: ', res);

    const {
      user: { myPrograms },
    } = res;

    dispatch({
      type: REVALIDATE_MYPROGRAM,
      payload: myPrograms,
    });

    return myPrograms;
  } catch (error) {
    console.log(error);
  }
};
