import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('');

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigation.navigate("Login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fontsLoaded, navigation]);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  function handleLogout() {
    setTimeout(() => {
      navigation.navigate("IndexScreen");
    }, 500);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/back_button.png")}
          />
        </Pressable>

        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.userInfo}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/images/profile_user.png')}
        />

        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.separator}></View>

      <Text 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Sair
      </Text>
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
    height: 98,
    flexShrink: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    width: 45,
    height: 24,
    top: 33,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  backButton: {
    width: 26,
    height: 26,
    top: 56,
    left: -176,
    flexShrink: 0,
  },


  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 46,
    marginLeft: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 300,
    borderWidth: 1,
    borderColor: "#000000",
  },
  userInfoText: {
    marginLeft: 24,
  },
  userName: {
    width: 114,
    height: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 28,
    color: "#000000",
  },
  userEmail: {
    width: 280,
    height: 16,
    marginTop: 8,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
    color: "#969595",
  },


  separator: {
    width: "100%",
    height: 1.08,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: '#969595',
  },


  logoutButton: {
    width: 35,
    height: 24,
    marginTop: 20,
    left: 24,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
});

export default Profile;