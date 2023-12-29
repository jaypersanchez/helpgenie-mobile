import { useEffect } from "react";
import { BackHandler } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@Screens/auth";

const Page = createNativeStackNavigator();

const Navigation = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      // return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Page.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        animation: "fade",
      }}
    >
      {/* <Page.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      <Page.Screen name="AuthScreens" component={LoginScreen} />
    </Page.Navigator>
  );
};

export default Navigation;
