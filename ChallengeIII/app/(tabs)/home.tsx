import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Text, View, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import data from "../../assets/api/data.json";

import FavoriteButton from '../../components/FavoriteButton';
import PopularFlatlist from "../../components/PopularFlatList"; 

export type Plant = {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  popular: number;
  classification: number;
  price: number;
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const [selectedClassification, setSelectedClassification] = useState<number | null>(null);
  const [flatListKey, setFlatListKey] = useState("initial");

  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);

  const toggleFavorite = (itemId: number) => {
    if (isFavorite(itemId)) {
      setFavoriteItems((prevFavorites) => prevFavorites.filter((id) => id !== itemId));
    } else {
      setFavoriteItems((prevFavorites) => [...prevFavorites, itemId]);
    }
  };
  
  const isFavorite = (itemId: number) => {
    return favoriteItems.includes(itemId);
  };
  
  useEffect(() => {}, []);

  if (!fontsLoaded) {
    return null;
  }
  const popularItems = data.body.products.filter((item) => item.popular === 1);

  const filteredItems = selectedClassification === null
    ? data.body.products
    : data.body.products.filter((item) => item.classification === selectedClassification);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hi}>Hi,</Text>
        <Text style={styles.title}>Most popular</Text>

        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("index" as never)}
        >
          <Image
            source={require("../../assets/images/profile_image.png")}
            style={styles.buttonImage}
          />
        </Pressable>

        <PopularFlatlist
          data={popularItems}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          navigation={navigation}
        />

        <View style={styles.buttonRow}>
          <Text
            style={[
              styles.allButton,
              selectedClassification === null ? styles.activatedButton : styles.nonActivatedButton,
            ]}
            onPress={() => {
              setSelectedClassification(null);
              setFlatListKey("all");
            }}
          >
            All
          </Text>

          <Text
            style={[
              styles.indoorButton,
              selectedClassification === 1 ? styles.activatedButton : styles.nonActivatedButton,
            ]}
            onPress={() => {
              setSelectedClassification(1);
              setFlatListKey("indoor");
            }}
          >
            Indoor
          </Text>

          <Text
            style={[
              styles.outdoorButton,
              selectedClassification === 2 ? styles.activatedButton : styles.nonActivatedButton,
            ]}
            onPress={() => {
              setSelectedClassification(2);
              setFlatListKey("outdoor");
            }}
          >
            Outdoor
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredItems}
        key={flatListKey}
        keyExtractor={(item: Plant) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Plant }) => (
          <View style={styles.itemContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate("details", { item });
              }}
            >
              <FavoriteButton 
              isFavorite={isFavorite(item.id)} onPress={() => toggleFavorite(item.id)} />

              <Image
                source={{ uri: item.coverImageUrl }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </Pressable>
          </View>
        )}
      />
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
    height: 450,
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
  },
  hi: {
    width: 97,
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
  title: {
    width: 135,
    height: 24,
    top: 146,
    left: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },

  buttonContainer: {
    position: "absolute",
    top: 79,
    right: 24,
    zIndex: 1,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },

  buttonRow: {
    flexDirection: "row",
    width: 220,
    height: 24,
    left: 27,
    marginBottom: 25,
  },
  allButton: {
    width: 20,
    flexShrink: 0,
  },
  indoorButton: {
    width: 52,
    marginLeft: 40,
    flexShrink: 0,
  },
  outdoorButton: {
    width: 67,
    marginLeft: 40,
    flexShrink: 0,
  },
  activatedButton: {
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  nonActivatedButton: {
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#969595",
  },

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
  itemImage: {
    width: "100%",
    height: 209,
    flexShrink: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemName: {
    width: 117,
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
    width: 45,
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
});