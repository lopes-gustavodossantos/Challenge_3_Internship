import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useFavorite } from "../context/favorite";

import { Ionicons } from "@expo/vector-icons";

interface Item {
  id: string;
  title: string;
  description: string;
  plantImage: string;
  category: string;
  value: string;
}

const Details = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavoriteClicked, isFavoritePressed] = useState(false);

  const route = useRoute();

  const { id, plantImage, title, value, category, description } =
    route.params as Item;

  const { favoriteItems, addFavorite, deletefavorite } = useFavorite();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleFavorite = () => {
    isFavoritePressed(!isFavoriteClicked);

    const Plant = {
      id,
      plantImage,
      title,
      value,
    };
    addFavorite(Plant);

    if (isFavoriteClicked) {
      deletefavorite(id);
    }
  };

  const handleAddToCart = () => {
    const Plant = {
      id,
      plantImage,
      title,
      value,
      quantity: quantity.toString(),
    };
    navigation.navigate("Cart", { cartItems: [Plant] });
  };

  const handleMoreQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleLessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const totalPrice = (quantity * parseFloat(value)).toFixed(2);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleGoBack}>
            <Image
              source={require("../../assets/images/back_button.png")}
            />
          </Pressable>

          <Text style={styles.title}>Details</Text>

          <Pressable
            style={[
              styles.favoriteButton,
              isFavoriteClicked && styles.heartButtonClicked,
            ]}
            onPress={handleFavorite}
          >
            <Ionicons 
              name="heart" 
              size={30} 
              color={isFavoriteClicked ? "#418B64" : "#000000"} 
            />
          </Pressable>
        </View>

        <Image
          source={{ uri: plantImage }}
          style={styles.itemImage}
        />

        <Text style={styles.itemCategory}>{category}</Text>

        <Text style={styles.itemName}>{title}</Text>

        <View style={styles.stylecontainerprice}>
          <Text style={styles.itemPrice}>${value}</Text>

          <View style={styles.quantityContainer}>
            <Pressable onPress={handleLessQuantity}>
              <Ionicons
                name="remove-circle-outline"
                size={20}
                color="#418B64"
              />
            </Pressable>

            <Text style={styles.quantityText}>{quantity}</Text>

            <Pressable onPress={handleMoreQuantity}>
              <Ionicons name="add-circle" size={20} color="#418B64" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.itemDescription}>{description}</Text>
      </View>

      <View style={styles.tabBar}>
        <Text style={styles.totalPriceTitle}>Total price</Text>
        <Text style={styles.totalPriceValue}>${totalPrice}</Text>
       
        <Pressable onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    height: 98,
    flexShrink: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    width: 50,
    height: 24,
    top: 33,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  backButton: {
    width: 26,
    height: 26,
    top: 56,
    left: -176,
    flexShrink: 0,
  },

  
  itemImage: {
    width: "100%",
    height: 247,
    flexShrink: 0,
  },
  itemCategory: {
    width: 120,
    height: 24,
    left: 24,
    marginTop: 20,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#969595",
  },
  itemName: {
    width: 300,
    height: 30,
    left: 24,
    marginTop: 15,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 31,
    color: "#000000",
  },
  itemPrice: {
    width: 70,
    height: 19,
    marginTop: 30,
    flexShrink: 0,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 23,
    color: "#000000",
  },
  quantityContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  stylecontainerprice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  quantityText: {
    marginHorizontal: 16,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  itemDescription: {
    width: 330,
    height: 312,
    left: 21,
    marginTop: 30,
    flexShrink: 0,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#969595",
  },
  

  tabBar: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: 92,
    bottom: 0,
    flexShrink: 0,
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
    backgroundColor: "#FFFFFF",
  },
  totalPriceTitle: {
    width: 64,
    height: 24,
    marginTop: 15,
    left: 25,
    flexShrink: 0,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  totalPriceValue: {
    width: 66,
    height: 24,
    left: 23,
    flexShrink: 0,
    fontFamily: "Poppins Medium",
    fontWeight: "700",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },


  addToCartButton: {
    width: 114,
    height: 48,
    borderRadius: 8,
    marginTop: -45,
    marginStart: 270,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  addToCartText: {
    width: 64,
    height: 20,
    flexShrink: 0,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 20,
    color: "#FFFFFF",
  },


  favoriteButton: {
    marginStart: 340,
    backgroundColor: "transparent",
  },
  heartButtonClicked: {
    backgroundColor: "#FFFFFF",
  },
});

export default Details;