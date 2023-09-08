import React from 'react';
import { Pressable, Image, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={require("../assets/images/favorite_button.png")} />
      <View style={styles.iconContainer}>
        <MaterialIcons name="favorite" size={16} color={isFavorite ? "#418B64" : "#CDCDCD"} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 12,
    left: 12,
    alignItems: "center",
    flexShrink: 0,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    flexShrink: 0,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default FavoriteButton;
