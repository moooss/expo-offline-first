export type Exercise = {
  id: string;
  title: string;
  isSynced?: boolean;
  isDone: boolean;
};

export type UpdateExercisePayload = {
  id: string;
  isDone: boolean;
};

let exercises: Exercise[] = [
  {
    id: "1",
    title: "Push ups",
    isDone: true,
  },
  {
    id: "2",
    title: "Pull ups",
    isDone: false,
  },
  {
    id: "3",
    title: "Squats",
    isDone: false,
  },
  {
    id: "4",
    title: "Lunges",
    isDone: false,
  },
  {
    id: "5",
    title: "Bench press",
    isDone: false,
  },
];

const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return exercises;
};

const updateExerciseStatus = async (
  id: string,
  isDone: boolean
): Promise<Exercise> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const exerciseToUpdate = exercises.find((t) => t.id === id);
  console.log("Update exercise:", exerciseToUpdate.title);
  if (exerciseToUpdate) {
    return {
      ...exerciseToUpdate,
      isDone,
    };
  }
};

export const api = {
  getTodos,
  updateExerciseStatus,
};
