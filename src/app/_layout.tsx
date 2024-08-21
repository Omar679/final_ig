import { Redirect, Slot, Stack } from "expo-router";
import AuthProvider, { useAuth } from "../providers/AuthProvider";
import "../../global.css";

export default function RootLayout() {
  const { user } = useAuth();

  console.log(user);
  if (user) {
    <Redirect href={"(tabs)"} />;
  }
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
