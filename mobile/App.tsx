import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LandingScreen from "./src/screens/LandingScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <LandingScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
