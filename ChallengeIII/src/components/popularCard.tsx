import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, Image, Pressable, StyleSheet, Platform } from "react-native";
import { useFavorite } from "../context/favorite";
 
import { Ionicons } from "@expo/vector-icons";

const PopularCard = ({ navigation, id, plantImage, title, value, showDetails }) => {
  const [isFavoriteClicked, isFavoritePressed] = useState(false); 
  const {favoriteItems, addFavorite, deletefavorite} = useFavorite();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleFavorite = () => {
    isFavoritePressed(!isFavoriteClicked); 

    const item = {
      id,
      plantImage,
      title,
      value,
    };
    addFavorite(item);

    if (isFavoriteClicked) {
      deletefavorite(id);
    }
  };

  const favoriteIconName = isFavoriteClicked ? "heart" : "heart-outline";

  return (
    <Pressable style={[styles.popularItemContainer]} onPress={showDetails} >
      <Image source={{ uri: plantImage }} style={styles.popularItemImage} />

      <Pressable
        style={[
          styles.favoriteButton,
          isFavoriteClicked && styles.favoriteButtonClicked, 
        ]}
        onPress={handleFavorite}
      >
        <Ionicons name={favoriteIconName} size={16} color={isFavoriteClicked ? "#418B64" : "black"} />
      </Pressable>

      <View style={styles.container}>
        <Text style={styles.popularItemName}>{title}</Text>
        <Text style={styles.popularItemPrice}>${value}</Text>

        <Pressable onPress={showDetails} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  popularItemContainer: {
    flexDirection: "row",
    width: 287,
    height: 140,
    marginTop: 170,
    marginHorizontal: 5,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },


  popularItemImage: {
    width: 150,
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  favoriteButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButtonClicked: { 
    backgroundColor: "#FFFFFF",
  },


  container: {
    flex: 1,
    marginLeft: 10,
  },
  popularItemName: {
    width: 85,
    height: 16,
    marginTop: 8,
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#000000",
  },
  popularItemPrice: {
    width: 55,
    height: 14,
    marginTop: 5,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#000000",
  },


  addToCartButton: {
    width: "90%",
    height: 20,
    marginTop: 70,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  addToCartText: {
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 14,
    color: "#FFFFFF",
  },
});

export default PopularCard;