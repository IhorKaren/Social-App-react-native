import React, { useState, useEffect, useContext } from "react";
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

const ProfileList = () => {
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
        {posts.map((el, index) => {
          return (
            <View key={index} style={styles.post}>
              <Image style={styles.postImage} source={{ uri: el.photoUri }} />
              <Text style={styles.postName}>{el.name}</Text>
              <View style={styles.postThumb}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 27,
                    marginTop: 11,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comments", getImage())}
                    style={styles.postInfo}
                  >
                    <Ionicons
                      name="chatbubbles-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log()}
                    style={styles.postInfo}
                  >
                    <Ionicons
                      name="thumbs-up-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text>0</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Map", getLocation())}
                  style={styles.postInfo}
                  disabled={getLocation() === null}
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />

                  <Text style={styles.postAddress}>{el.address}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    )
  );
};

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
  postAddressDisable: {
    fontSize: 16,
    lineHeight: 19,
  },
});

export default ProfileList;
