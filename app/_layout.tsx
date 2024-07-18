import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProductsProvider } from "@/context/products-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PlusJakartaBold: require("../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf"),
    PlusJakarta: require("../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf"),
    ArvoBold: require("../assets/fonts/arvo/Arvo-Bold.ttf"),
    ArvoRegular: require("../assets/fonts/arvo/Arvo-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
