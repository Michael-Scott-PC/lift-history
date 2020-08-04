import { GraphQLClient } from 'graphql-request';

import strapiAPI from '../../api/strapiAPI';
import {
  CREATE_USER_PROGRAM,
  REVALIDATE_MYPROGRAM,
  REVALIDATE_PROFILE,
} from './types';

// THIS IS NO LONGER NECESSARY - the exercise Ids were already available on the frontend.
// /**
//  * @description: Retrieves the exercise Id from database and returns them to be used
//  * in setsAndRepsHelper.
//  * @param {Object} values - Values from the AddExerciseFormik form.
//  */
// export const getExerciseIds = async values => {
//   let primaryExerciseId;
//   if (values.primaryExercise) {
//     const { data: primaryData } = await strapiAPI.get(
//       `/exercises?nameOfExercise=${values.primaryExercise}`
//     );

//     primaryExerciseId = primaryData[0].id;
//   }

//   let secondaryExerciseId;
//   if (values.secondaryExercise) {
//     const { data: secondaryData } = await strapiAPI.get(
//       `/exercises?nameOfExercise=${values.secondaryExercise}`
//     );

//     secondaryExerciseId = secondaryData[0].id;
//   }

//   let thirdExerciseId;
//   if (values.thirdExercise) {
//     const { data: thirdData } = await strapiAPI.get(
//       `/exercises?nameOfExercise=${values.thirdExercise}`
//     );

//     thirdExerciseId = thirdData[0].id;
//   }

//   return [primaryExerciseId, secondaryExerciseId, thirdExerciseId];
// };

/**
 * @description: The returned list becomes the value for thisDaysExercises property in
 * mapValues object in createUserProgram function.
 * @param {Object} values - Values from the AddExerciseFormik form.
 * @param {bool} getExerciseId - Determines if we need to execute getExerciseIds function.
 */
export const setsAndRepsHelper = async (
  values,
  getExerciseId,
  getColorId,
  colorId
) => {
  console.log('setsAndRepsHelper values: ', values);
  console.log('setsAndRepsHelper colorId: ', colorId);
  // In order to successfully create or update 'myProgram', the exercise ID must be passed in the object
  // However, in order to mutate our UI with SWR, we need the exercise name, not the ID. The getExerciseId
  // param allows us to control which value is passed to 'exercise' so we don't break the rendering logic.
  // let primaryExerciseId, secondaryExerciseId, thirdExerciseId;
  // if (getExerciseId) {
  //   [
  //     primaryExerciseId,
  //     secondaryExerciseId,
  //     thirdExerciseId,
  //   ] = await getExerciseIds(values);
  // }

  const fullWorkout = [];
  if (values.primaryExercise.id) {
    fullWorkout.push({
      exercise: !getExerciseId
        ? { nameOfExercise: values.primaryExercise.nameOfExercise }
        : { id: values.primaryExercise.id },
      // TODO: do the exact same thing for color Id as exercise Id
      color: !getColorId
        ? { color: values.primaryExerciseBgColor }
        : { id: colorId },
      thisSetsAndReps: values.primarySetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  if (values.secondaryExercise.id) {
    fullWorkout.push({
      exercise: !getExerciseId
        ? { nameOfExercise: values.secondaryExercise.nameOfExercise }
        : { id: values.secondaryExercise.id },
      thisSetsAndReps: values.secondarySetsAndReps.map(exercise => ({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rpe: values.rpe ? exercise.rpe : null,
        pct: values.pct ? exercise.pct : null,
      })),
    });
  }
  if (values.thirdExercise.id) {
    fullWorkout.push({
      exercise: !getExerciseId
        ? { nameOfExercise: values.thirdExercise.nameOfExercise }
        : { id: values.thirdExercise.id },
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
export const createUserProgram = (
  jwt,
  id,
  values,
  colorId
) => async dispatch => {
  console.log('createUserProgram values: ', values);
  console.log('createUserProgram colorId: ', colorId);
  const userId = id;

  const getExerciseId = true;
  const getColorId = true;
  const mapValues = {
    scheduleExercise: values.pickDate,
    isSuperSet: values.isSuperSet,
    isTripleSet: values.isTripleSet,
    thisDaysExercises: await setsAndRepsHelper(
      values,
      getExerciseId,
      getColorId,
      colorId
    ),
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
  const query = `{
    user(id: ${userId}) {
      id
      myPrograms{
        id
        scheduleExercise
        thisDaysExercises {
          id
          exercise {
            id
            nameOfExercise
          }
          color {
            id
            color
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
    // console.log('profile: ', profile);
    // profile {
    //   color_code_exercises {
    //     color {
    //       id
    //       color
    //     }
    //     exercise {
    //       id
    //       nameOfExercise
    //     }
    //     isDefault
    //   }
    // }
    // dispatch({
    //   type: REVALIDATE_PROFILE,
    //   payload: profile,
    // });

    dispatch({
      type: REVALIDATE_MYPROGRAM,
      payload: myPrograms,
    });

    return myPrograms;
  } catch (error) {
    console.log(error);
  }
};
