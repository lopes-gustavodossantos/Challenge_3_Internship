import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";

import PopularCard from "../components/popularCard";
import LongCard from "../components/allCard";

const HomeScreen = ({ navigation }) => {
  interface plantItem {
    description: any;
    category: string;
    price: any;
    image: any;
    id: string;
    plantImage: any;
    title: string;
  }

  const [] = useState<plantItem[]>([]); 
  const [dataMostPopular, setDataMostPopular] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/"
      );

      if (response.status === 200) {
        const responseData = await response.json();
        const { mostPopular, items } = responseData.body.data;

        if (Array.isArray(mostPopular) && Array.isArray(items)) {
          setDataMostPopular(mostPopular); 
          setDataItems(items); 
        }
      }
    };

    fetchData();
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.hi}>Hi, John</Text>
          <Text style={styles.title}>Most popular</Text>

          <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={require("../../assets/images/profile_image.png")}
            style={styles.buttonImage}
          />
        </Pressable>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataMostPopular}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.popularItemContainer}
          renderItem={({ item }) => (
            <PopularCard
              showDetails={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  plantImage: item.image,
                  title: item.title,
                  value: item.price,
                  category: item.category,
                  description: item.description,
                })
              }
              id={item.id}
              plantImage={item.image}
              title={item.title}
              value={item.price}
              navigation={navigation}
            />
          )}
        />

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => handleCategory("All")}
            style={[
              styles.allButton,
              selectedCategory === "All" && styles.activatedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === "All" && styles.activatedButtonText,
              ]}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleCategory("Indoor")}
            style={[
              styles.indoorButton,
              selectedCategory === "Indoor" && styles.activatedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === "Indoor" && styles.activatedButtonText,
              ]}
            >
              Indoor
            </Text>
          </Pressable>
          
          <Pressable
            onPress={() => handleCategory("Outdoor")}
            style={[
              styles.outdoorButton,
              selectedCategory === "Outdoor" && styles.activatedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === "Outdoor" && styles.activatedButtonText,
              ]}
            >
              Outdoor
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {dataItems 
          .filter((item) =>
            selectedCategory === "All"
            ? true
            : item.category === selectedCategory
          )
          .map((item) => (
            <LongCard
              showDetails={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  plantImage: item.image,
                  title: item.title,
                  value: item.price,
                  category: item.category,
                  description: item.description,
                })
              }

              key={item.id}
              plantImage={item.image}
              onAddToCart={() => console.log("adicionado ao carrinho")}
              title={item.title}
              value={item.price}
              id={item.id}
            />
          ))}
      </ScrollView>
    </View>
  );
};

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


  popularItemContainer: {
    paddingHorizontal: 24,
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

  
  buttonText: {
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#969595",
  },
  activatedButton: {
    backgroundColor: "none",
  },
  activatedButtonText: {
    fontFamily: "Poppins Regular",
    fontWeight: "500",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
});

export default HomeScreen;