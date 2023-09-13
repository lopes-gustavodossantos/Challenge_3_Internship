import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useCart } from "../context/cart";

import { Ionicons } from "@expo/vector-icons";

const CardCart = ({ plantImage, title, value, quantity, onremove, id,  }) => {
  const [cardQuantity, setCardQuantity] = useState( Number(quantity));
  const [showTrashButton, setShowTrashButton] = useState(quantity === 1);

  const { addQuantity} = useCart();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleMore = () => {
    setCardQuantity(cardQuantity + 1);
    addQuantity(id, cardQuantity + 1);

    setShowTrashButton(false);
  };

  const handleLess = () => {
    if (cardQuantity > 1) {
      setCardQuantity(cardQuantity - 1);
      addQuantity(id, cardQuantity - 1);
    } else {
      setShowTrashButton(true);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: plantImage }} style={styles.image} />

      <View style={styles.textGroup}>
        <Text style={styles.itemName}>{title}</Text>
        <Text style={styles.itemPrice}>${value}</Text>
      </View>

      <View style={styles.buttonCard}>
        {showTrashButton ? (
          <Pressable style={styles.trashButton} onPress={() => onremove(id)}>
            <Ionicons name="trash-outline" size={15} color="#FF0000" />
          </Pressable>
        ) : (
          <Pressable style={styles.lessButton} onPress={handleLess}>
            <Ionicons name="remove" size={15} color="#418B64" />
          </Pressable>
        )}

        <Text style={styles.quantityText}>{cardQuantity}</Text>

        <Pressable style={styles.moreButton} onPress={handleMore}>
          <Ionicons name="add-outline" size={15} color="#FFFFFF" onPress={handleMore}/>
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


  buttonCard: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  lessButton: {
    width: 20,
    height: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  moreButton: {
    width: 20,
    height: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#418B64",
  },
  trashButton: {
    width: 20,
    height: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  quantityText: {
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
});

export default CardCart;