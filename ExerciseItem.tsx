import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { Exercise } from "./fakeApi";

interface ExerciseItemProps {
  exercise: Exercise;
  onButtonPress: () => void;
}

const ExerciseItem = ({ exercise, onButtonPress }: ExerciseItemProps) => {
  const backgroundColor = exercise.isDone ? "#4caf50" : "#e0e0e0";
  const iconColor = exercise.isDone ? "#fff" : "#000";
  return (
    <TouchableOpacity style={styles.container} onPress={onButtonPress}>
      <View style={[styles.circle, { backgroundColor }]}>
        <Icon color={iconColor} name="check" />
      </View>
      <Text style={styles.text}>
        {exercise.title} - {exercise?.isSynced ? "synced" : "not synced"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    marginTop: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ExerciseItem;
