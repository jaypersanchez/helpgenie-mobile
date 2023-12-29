import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@tanstack/react-query";

import { Button, Checkbox, InputField, Seperator, Text } from "@Components";

import { Eye, Eyeoff, Lock, Message } from "@Components/icons";

import Logo from "@Assets/images/logo.png";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }) => {
  const iOSPlatform = Platform.OS === "ios";
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleSignup = () => {
    navigation.navigate("SignupScreen");
  };

  const handleRememberMe = (e) => {
    console.log({ sso: e });
    setIsChecked(!isChecked);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        setIsLoading(true);
        setIsPasswordShown(false);
        console.log({ values });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#ffffff", flex: 1 }}
      // edges={["right", "left", "bottom"]}
    >
      <StatusBar hidden={false} />
      <KeyboardAvoidingView
        behavior={iOSPlatform ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={[styles.box, { marginTop: isKeyboardShown ? 48 : 0 }]}>
          <View
            style={[
              styles.logo_container,
              { display: isKeyboardShown ? "none" : "flex" },
            ]}
          >
            <Image style={styles.logo} source={Logo} />
          </View>
          <Text label="Login to your Account" size="xl_5" font="bold" />

          <InputField
            icons={{
              left: { icon: Message, size: 20, color: "#9E9E9E" },
            }}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onFieldBlur={() => formik.setFieldTouched("email", true)}
            onFieldFocus={() => formik.setFieldTouched("email", false)}
            error={
              Boolean(formik.errors.email) && formik.touched.email
                ? formik.errors.email
                : formik.status === "Wrong email or password"
                ? formik.status
                : null
            }
          />
          <InputField
            icons={{
              left: { icon: Lock, size: 20, color: "#9E9E9E" },
              right: {
                icon: isPasswordShown ? Eye : Eyeoff,
                size: 26,
                onPress: () => setIsPasswordShown(!isPasswordShown),
              },
            }}
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onFieldBlur={() => formik.setFieldTouched("password", true)}
            onFieldFocus={() => formik.setFieldTouched("password", false)}
            showPassword={!isPasswordShown}
            error={
              Boolean(formik.errors.password) && formik.touched.password
                ? formik.errors.password
                : formik.status === "Wrong email or password"
                ? formik.status
                : null
            }
          />

          <View>
            <Checkbox
              label="Remember me"
              isChecked={isChecked}
              onToggle={handleRememberMe}
              color="#616161"
              fontsize="sm"
              size="sm"
            />
          </View>

          <Button
            label={{
              text: "Login",
              size: "xl",
              style: { textTransform: "uppercase" },
            }}
            onPress={formik.handleSubmit}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Text
          label={"Don't have an account? "}
          size="sm"
          font="semibold"
          style={{ color: "#9E9E9E" }}
        />
        <TouchableOpacity activeOpacity={0.45} onPress={handleSignup}>
          <Text
            label="Sign up"
            size="sm"
            font="bold"
            style={{ color: "#6842FF" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "red",
    height: "100%",
    gap: 24,
  },
  box: {
    gap: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignContent: "center",
  },
  logo_container: {
    width: "100%",
    height: 195,
  },
  logo: {
    height: "50%",
    width: "50%",
    alignSelf: "center",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height
    marginRight: 8,
  },
  buttonStyle: {
    marginVertical: 10, // Adjust this value to control the vertical spacing between buttons
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 4,
  },
});
