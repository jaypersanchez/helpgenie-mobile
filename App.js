import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import Navigation from "./src/navigation";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2500));

        if (!fontsLoaded && !fontError) {
          console.log("fonts not loaded");
          setAppReady(false);
        } else {
          console.log("fonts loaded");
          setAppReady(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar animated backgroundColor="#fff" style="dark" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
