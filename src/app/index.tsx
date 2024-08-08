import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";

const Home = () => {
  return (
    <View>
      <Redirect href={"(tabs)"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
