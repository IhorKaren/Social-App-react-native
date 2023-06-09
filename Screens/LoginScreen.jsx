import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../Redux/Selectors/selectors";
import { logIn } from "../Redux/operations";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../Components/Background";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(isLogin);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    const currentUser = { email, password };

    dispatch(logIn(currentUser));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-180}
        >
          <Background />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity
                  onPress={() => console.log("Перехід до сторінки логіну")}
                >
                  <Text style={styles.showHideText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
            {!keyboardOpen && (
              <>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.loginText}>
                    Немає акаунту?
                    <Text
                      style={styles.loginLink}
                      onPress={() => navigation.navigate("Registration")}
                    >
                      {" "}
                      Зареєструватися
                    </Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    width: "100%",
    position: "absolute",
  },

  formContainer: {
    marginTop: "auto",
    display: "flex",

    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  profileIcon: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -0.4 * 120 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  addPicture: {
    position: "absolute",
    bottom: -105,
    right: -12.5,
  },

  title: {
    marginBottom: 33,

    color: "#20232a",

    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
  },

  form: {
    display: "flex",
    gap: 16,
    marginBottom: 43,
  },

  input: {
    width: "100%",
    fontSize: 16,

    borderWidth: 1,
    borderRadius: 8,

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",

    padding: 16,
  },

  showHideText: {
    position: "absolute",
    bottom: 16,
    right: 16,
    transform: [{ translateY: -4 }],

    fontSize: 16,
    textDecorationLine: "underline",

    color: "#1B4371",
  },

  submitButton: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },

  submitButtonText: {
    textAlign: "center",
    fontSize: 16,

    color: "#FFFFFF",
  },

  loginText: {
    textAlign: "center",
    color: "#1B4371",
  },

  loginLink: {
    textAlign: "center",
    textDecorationLine: "underline",

    color: "#1B4371",
  },
});

export default LoginScreen;
