import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import ExerciseItem from "./ExerciseItem";
import { api, Exercise, UpdateExercisePayload } from "./fakeApi";

const ExercisesPage = () => {
  const queryClient = useQueryClient();

  // Fetch the exercises
  const { data: fetchedExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => api.getTodos(),
    staleTime: Infinity,
  });

  const updateExerciseListLocal = (
    id: string,
    isDone: boolean,
    isSynced?: boolean
  ) => {
    queryClient.setQueryData<Exercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            isDone,
            isSynced,
          };
        }
        return exercise;
      });
    });
  };

  // Declare the mutation that updates the exercise status
  const updateExercise = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) =>
      api.updateExerciseStatus(payload.id, payload.isDone),
    onMutate: async (payload: UpdateExercisePayload) => {
      // Before the mutation has started
      // Cancel pending queries
      await queryClient.cancelQueries({ queryKey: ["exercises"] });
      // Optimistically update the local state
      updateExerciseListLocal(payload.id, payload.isDone, false);
    },
    onSuccess(data) {
      // After the mutation has completed
      // Update the local state with the response
      updateExerciseListLocal(data.id, data.isDone, true);
    },
  });

  // Launch mutation on button press
  const handleOnButtonPress = (exercise: Exercise) =>
    updateExercise.mutate({
      id: exercise.id,
      isDone: !exercise.isDone,
    });

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.screenTitle}>Exercises</Text>
        {fetchedExercises?.map((exercise) => (
          <ExerciseItem
            onButtonPress={() => handleOnButtonPress(exercise)}
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    padding: 16,
  },
  screenTitle: {
    padding: 16,
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "bold",
  },
});

export default ExercisesPage;
