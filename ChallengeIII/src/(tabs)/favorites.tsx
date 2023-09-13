import React from "react";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useFavorite } from "../context/favorite";
import FavoriteCards from "../components/favoriteCards";

export interface FavoriteItems {
  id: string;
  plantImage: any; 
  title: string;
  value: string;
  quantity: string; 
  favorite: boolean
} 

export default function FavoriteScreen({ }) {
  const {favoriteItems} = useFavorite();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {favoriteItems.map((item, index) => (
          <FavoriteCards
            id={item.id}
            key={index}
            plantImage={item.plantImage}
            title={item.title}
            value={item.value}
            isFavorite={item.favorite}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    height: 105,
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
  },
  title: {
    width: 150,
    height: 24,
    top: 82,
    left: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 27,
    color: "#000000",
  },


  scrollContainer: {
    flex: 1,
  },
});