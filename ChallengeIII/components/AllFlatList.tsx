import React from 'react';
import { FlatList, Image, Pressable, Text, View, StyleSheet, Platform } from 'react-native';
import { Plant } from "../app/(tabs)/home";
import FavoriteButton from './FavoriteButton';

interface AllFlatListProps {
  data: Plant[];
  isFavorite: (itemId: number) => boolean;
  toggleFavorite: (itemId: number) => void;
  navigation: any;
}

const AllFlatList: React.FC<AllFlatListProps> = ({
  data,
  isFavorite,
  toggleFavorite,
  navigation,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: Plant) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: Plant }) => (
        <View style={styles.itemContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('details', { item });
            }}
          >
            <FavoriteButton
              isFavorite={isFavorite(item.id)}
              onPress={() => toggleFavorite(item.id)}
            />
            <Image source={{ uri: item.coverImageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </Pressable>
        </View>
      )}
    />
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

export default AllFlatList;