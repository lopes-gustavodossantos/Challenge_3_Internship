import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, Image, Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorite } from "../context/favorite";
 

const FavoriteCards = ({id, plantImage, title, value, isFavorite }) => {
  const [isFavoriteClicked] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const {deletefavorite} = useFavorite();

  const handleFavorite = () => {
    deletefavorite(id);
  };

  return ( 
    <View style={styles.card}>
      <Image source={{ uri: plantImage }} style={styles.image} />

      <View style={styles.textGroup}>
        <Text style={styles.itemName}>{title}</Text>
        <Text style={styles.itemPrice}>${value}</Text>
      </View>
                    
      <View style={styles.favoriteButton}>

        <Pressable
          style={[
            styles.heartButton,
            isFavoriteClicked && styles.heartButtonClicked,
          ]}
          onPress={handleFavorite}
        >
          <Ionicons name={"heart"} size={16} color={ "#418B64"} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 73,
    marginHorizontal: 24,
    marginVertical: 10,
    flexShrink: 0,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#ECF8F3",
  },
  image: {
    width: 91,
    height: "100%",
    marginRight: 10,
    flexShrink: 0,
    borderRadius: 8,
  },
  textGroup: {
    flex: 1,
  },
  itemName: {
    width: 200,
    height: 16,
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#000000",
  },
  itemPrice: {
    width: 100,
    height: 14,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#000000",
  },


  favoriteButton: {
      alignItems: "center",
      justifyContent: "center",
  },
  heartButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  heartButtonClicked: { 
    backgroundColor: "#FFFFFF",
  },
});

export default FavoriteCards;
