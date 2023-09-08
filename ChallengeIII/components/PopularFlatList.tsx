import React from "react";
import { FlatList, Image, Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Plant } from "../app/(tabs)/home";
import FavoriteButton from './FavoriteButton';
  
interface PopularFlatListProps {
  data: Plant[];
  isFavorite: (itemId: number) => boolean;
  toggleFavorite: (itemId: number) => void;
  navigation: any;
}

const PopularFlatList: React.FC<PopularFlatListProps> = ({
  data,
  isFavorite,
  toggleFavorite,
  navigation,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: Plant) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }: { item: Plant; index: number }) => (
        <Pressable
          style={[
            styles.popularItemContainer,
            index === 0 ? { marginLeft: 24 } : {},
            index === data.length - 1 ? { marginRight: 24 } : {},
          ]}
          onPress={() => {
            navigation.navigate("details", { item });
          }}
        >
          <FavoriteButton
            isFavorite={isFavorite(item.id)}
            onPress={() => toggleFavorite(item.id)}
          />
          <Image source={{ uri: item.coverImageUrl }} style={styles.popularItemImage} />
          <View style={styles.popularItemTextContainer}>
            <Text style={styles.popularItemName}>{item.name}</Text>
            <Text style={styles.popularItemPrice}>${item.price}</Text>
          </View>
        </Pressable>
      )}
    />
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
  });

export default PopularFlatList;