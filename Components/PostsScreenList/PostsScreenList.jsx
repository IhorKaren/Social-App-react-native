import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../AppContext";

const PostsScreenList = () => {
  const [posts, setPosts] = useState([]);
  const { params } = useContext(AppContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (params) {
      setPosts((state) => [...state, ...params]);
    }
  }, [params]);

  const getImage = () => {
    return params[0].photoUri;
  };

  const getLocation = () => {
    return params[0].location;
  };

  return (
    posts.length > 0 && (
      <ScrollView>
        {posts.map((item, index) => (
          <View style={styles.post} key={index}>
            <Image style={styles.postImage} source={{ uri: item.photoUri }} />
            <Text style={styles.postName}>{item.name}</Text>
            <View style={styles.postThumb}>
              <TouchableOpacity
                style={styles.postInfo}
                onPress={() => navigation.navigate("Comments", getImage())}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={24}
                  color="#BDBDBD"
                />
                <Text>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Map", getLocation())}
                style={styles.postInfo}
                disabled={getLocation() === null}
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.postAddress}>{item.address}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    )
  );
};

export default PostsScreenList;

const styles = StyleSheet.create({
  post: {
    marginBottom: 34,
  },
  postImage: {
    width: "100%",
    height: 240,

    borderWidth: 1,
    borderRadius: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  postThumb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 11,
  },
  postInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
  },
  postAddress: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
