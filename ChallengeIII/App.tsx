import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import CartProvider from "./src/context/cart";
import FavoriteProvider from "./src/context/favorite";
import UserProvider from "./src/context/UserLogin";
import AppNavigator from "./src/routes/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar />

      <FavoriteProvider>

        <CartProvider>

          <UserProvider>

              <AppNavigator />


          </UserProvider>

        </CartProvider>

      </FavoriteProvider>
      
    </>
  );
}
