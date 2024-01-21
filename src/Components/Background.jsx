import React from "react";
import { Image, StyleSheet } from "react-native";

const Background = () => {
  return (
    <Image
      source={require("../images/PhotoBG.jpg")}
      resizeMode="cover"
      style={styles.backgroundImage}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    position: "absolute",
  },
});

export default Background;
