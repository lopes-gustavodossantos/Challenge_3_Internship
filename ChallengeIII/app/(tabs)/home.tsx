import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Text, View, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import data from "../../assets/api/data.json";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const [selectedClassification, setSelectedClassification] = useState<number | null>(null);
  const [flatListKey, setFlatListKey] = useState("initial"); // Add flatListKey state

  useEffect(() => {
  }, []);

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

        <FlatList
          data={popularItems}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.popularItemContainer,
                index === 0 ? { marginLeft: 24 } : {},
                index === popularItems.length - 1 ? { marginRight: 24 } : {},
              ]}
            >
              <Image
                source={{ uri: item.coverImageUrl }}
                style={styles.popularItemImage}
              />
              <View style={styles.popularItemTextContainer}>
                <Text style={styles.popularItemName}>{item.name}</Text>
                <Text style={styles.popularItemPrice}>${item.price}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.buttonRow}>
          <Text
            style={[
              styles.allButton,
              selectedClassification === null ? styles.activatedButton : styles.nonActivatedButton,
            ]}
            onPress={() => {
              setSelectedClassification(null);
              setFlatListKey("all"); // Reset FlatList
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
              setFlatListKey("indoor"); // Reset FlatList
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
              setFlatListKey("outdoor"); // Reset FlatList
            }}
          >
            Outdoor
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredItems}
        key={flatListKey} // Use key prop to reset FlatList
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.coverImageUrl }}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
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
  },
  buttonImage: {
    width: 30,
    height: 30,
  },

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
  },
  popularItemTextContainer: {
    flexDirection: 'column',
    left: 16,
    flexShrink: 0,
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
    width: 45,
    height: 14,
    marginTop: 5,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#000000",
  },

  buttonRow: {
    flexDirection: "row",
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
