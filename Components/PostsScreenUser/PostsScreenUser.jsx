import { View, Text, Image, StyleSheet } from "react-native";

const PostsScreenUser = () => {
  return (
    <View style={styles.user}>
      <View style={styles.avatar}></View>
      <View style={styles.thumb}>
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
        </View>
        <View>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 32,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});

export default PostsScreenUser;
