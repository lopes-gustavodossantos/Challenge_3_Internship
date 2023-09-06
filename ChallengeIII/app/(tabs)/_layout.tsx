import { useFonts } from "expo-font";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          display: 'flex',
          width: '100%',
          height: 84,
          left: -1,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0.549,
          paddingLeft: 0.805,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          backgroundColor: "#00ff00",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => <SimpleLineIcons name="home" size={30} color="#000000" />,
          tabBarLabelStyle: { 
            width: 40,
            height: 14,
            top: -12,
            fontFamily: "Source Sans Pro",
            fontWeight: "400",
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 14,
            color: "#000000",
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: () => <MaterialIcons name="favorite-border" size={30} color="#000000" />,
          tabBarLabelStyle: { 
            width: 54,
            height: 14,
            top: -12,
            fontFamily: "Source Sans Pro",
            fontWeight: "400",
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 14,
            color: "#000000",
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: () => <SimpleLineIcons name="bag" size={30} color="#000000" />,
          tabBarLabelStyle: { 
            width: 25,
            height: 14,
            top: -12,
            fontFamily: "Source Sans Pro",
            fontWeight: "400",
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 14,
            color: "#000000",
          },
        }}
      />
    </Tabs>
  );
}
