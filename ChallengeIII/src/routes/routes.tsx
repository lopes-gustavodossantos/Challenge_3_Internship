import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  Platform,
  Text,
} from "react-native";

import IndexScreen from "../(tabs)";
import SignInScreen from "../(tabs)/signIn";
import SignUpScreen from "../(tabs)/signUp";
import Home from "../(tabs)/home";
import Profile from "../(tabs)/profile";
import Details from "../(tabs)/details";
import FavoriteScreen from "../(tabs)/favorites";
import CartScreen from "../(tabs)/cart";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons } from '@expo/vector-icons';

export type RootStackParamList = {
  IndexScreen: undefined;
  SignInScreen: { onLogin: () => void };
  Home: undefined;
  Favorite: undefined;
  Cart: undefined;
  Profile: undefined
  Details: { id: number };
  SignUpScreen: undefined
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorite: undefined;
  Details: { id: number };
  SignUpScreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function CustomTabBarIcon({ route, focused }: { route: any, focused: boolean }) {
  let iconName;
  let label;

  if (route.name === "Home") {
    iconName = "home";
  } else if (route.name === "Favorite") {
    iconName = "heart";
  } else if (route.name === "Cart") {
    iconName = "bag";
  }

  return (
    <React.Fragment>
      {iconName && (
        <SimpleLineIcons
          name={iconName}
          size={30}
          color={focused ? "green" : "black"}
        />
      )}
      {label && (
        <Text style={{ color: focused ? "green" : "black" }}>{label}</Text>
      )}
    </React.Fragment>
  );
}

function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "green", 
        tabBarInactiveTintColor: "black", 
        tabBarStyle: [
          {
            display: "flex",
            width: "100%",
            height: 84,
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
          null,
        ],
        tabBarIcon: ({ focused }) => (
          <CustomTabBarIcon route={route} focused={focused} />
        ),
        tabBarLabelStyle: { 
          width: 54,
          height: 14,
          top: -12,
          fontFamily: "Source Sans Pro",
          fontWeight: "400",
          fontSize: 14,
          fontStyle: "normal",
          lineHeight: 14,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [loggedUser] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedUser ? "Home" : "IndexScreen"}
        screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}
      >
        <Stack.Screen 
          name="IndexScreen" 
          component={IndexScreen} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
