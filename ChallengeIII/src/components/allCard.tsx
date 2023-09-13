import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, Image, Pressable, StyleSheet, Platform } from "react-native";

import { useFavorite } from "../context/favorite";

import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const LongCardButton = ({ plantImage,id, title, value, onAddToCart, showDetails }) => {
  const [isFavoriteClicked, isFavoritePressed] = useState(false);

  const {favoriteItems, addFavorite, deletefavorite} = useFavorite();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
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
    <View style={styles.itemContainer}>
      <Pressable onPress={showDetails}>
        <Image source={{ uri: plantImage }} style={styles.itemImage} />

        <Pressable
          style={[
            styles.favoriteButton,
            isFavoriteClicked && styles.favoriteButtonClicked,
          ]}
          onPress={handleFavorite}
        >
          <Ionicons name={favoriteIconName} size={16} color={isFavoriteClicked ? "#418B64" : "black"} />
        </Pressable>

        <View style={styles.itemContent}>
          <View>
            <Text style={styles.itemName}>{title}</Text>
            <Text style={styles.itemPrice}>${value}</Text>
          </View>

          <Pressable style={styles.addToCartButton} onPress={showDetails}>
            <SimpleLineIcons name="bag" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: 279,
    flexShrink: 0,
    marginHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
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


  favoriteButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButtonClicked: { 
    backgroundColor: "#FFFFFF",
  },

  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemImage: {
    width: "100%",
    height: 209,
    flexShrink: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemName: {
    width: 200,
    height: 26,
    left: 18,
    marginTop: 10,
    flexShrink: 0,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  itemPrice: {
    width: 55,
    height: 25,
    left: 18,
    flexShrink: 0,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  addToCartButton: {
    width: 30,
    height: 30,
    marginRight: 20,
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
});

export default LongCardButton;