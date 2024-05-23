import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineBanner = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: "red",
        padding: 16,
        paddingTop: top + 16,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>
        You are offline!
      </Text>
    </View>
  );
};

export default OfflineBanner;
