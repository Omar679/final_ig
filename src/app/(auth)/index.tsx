import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/superbase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <StatusBar hidden />
      <Image
        source={require("assets/welcome.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontWeight: "700", fontSize: 25 }}>Welcome Back</Text>
      <View style={{ padding: 10, width: "100%", alignSelf: "flex-start" }}>
        <Text style={{ alignSelf: "flex-start" }}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(v) => setEmail(v)}
          style={{ borderWidth: 1, padding: 5, width: "100%", borderRadius: 5 }}
        />
        <Text style={{ alignSelf: "flex-start" }}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(input) => setPassword(input)}
          secureTextEntry
          style={{ borderWidth: 1, padding: 5, width: "100%", borderRadius: 5 }}
        />
      </View>
      <View style={{ width: 200 }}>
        <Button title="Signup" onPress={signUpWithEmail} />
        <Button title="Login" onPress={signInWithEmail} />
      </View>
    </View>
  );
}
