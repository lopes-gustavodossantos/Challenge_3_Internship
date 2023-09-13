import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import CardCart from "../components/cartCards";
import { useCart } from "../context/cart";
import { useRoute } from "@react-navigation/native";

export interface CartItem {
  id: string;
  plantImage: string;
  title: string;
  value: string;
  quantity: string;
}

export default function CartScreen({}) {
  const { cartItems, addItem, addCartItem, deleteItem } = useCart();

  const route = useRoute();

  const routeParams = route.params as { cartItems: CartItem[] } | undefined;

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((i) => {
        if (i.id === item.id) {
          i.quantity = (parseFloat(i.quantity) + parseFloat(item.quantity)).toString();
        }
        return i;
      });
      addItem(updatedCartItems);
    } else {
      addCartItem(item);
    }
  };

  useEffect(() => {
    if (routeParams && routeParams.cartItems) {
      routeParams.cartItems.forEach((item) => addToCart(item));
    }
  }, [routeParams]);

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const subtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.value) * parseFloat(item.quantity);
    }
    return subtotal.toFixed(2);
  };

  const handleCheckout = () => {
    addItem([]);
  };

  const deleteCartItem = (id: any) => {
    deleteItem(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map((item, index) => (
          <CardCart
            id={item.id}
            key={index}
            plantImage={item.plantImage}
            title={item.title}
            value={item.value}
            quantity={item.quantity}
            onremove={deleteCartItem}
          />
        ))}
        
      </ScrollView>

      <View style={styles.rectangle}>
        <View style={styles.rectangleContent}>
          <Text style={styles.rectangleText}>Subtotal:</Text>
          <Text style={styles.rectanglePrice}>${subtotal()}</Text>
        </View>
      </View>

      <Pressable style={styles.buttonCheckout} onPress={handleCheckout}>
        <Text style={styles.buttonCheckoutText}>Go to Checkout</Text>
      </Pressable>
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
    width: 54,
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
  tabBar: {
    display: "flex",
    position: "absolute",
    width: "100%",
    height: 120,
    bottom: 0,
    flexShrink: 0,
    backgroundColor: "FFFFFF",
  },
  rectangle: {
    width: 360,
    height: 30,
    marginTop: 5,
    left: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#418B64",
    justifyContent: "center",
    backgroundColor: "#ECF8F3",
  },
  rectangleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
  rectangleText: {
    width: 54,
    height: 14,
    left: 5,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 14,
    color: "#000000",
  },
  rectanglePrice: {
    height: 14,
    fontFamily: "Source Sans Pro",
    fontWeight: "700",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 14,
    color: "#000000",
  },
  buttonCheckout: {
    width: 360,
    height: 48,
    marginTop: 15,
    left: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  buttonCheckoutText: {
    width: 105,
    height: 20,
    fontFamily: "Source Sans Pro",
    fontWeight: "600",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
