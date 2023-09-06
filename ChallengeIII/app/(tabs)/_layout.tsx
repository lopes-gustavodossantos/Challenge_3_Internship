import { useFonts } from "expo-font";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3, color: props.color }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
          backgroundColor: "#FFFFFF",
        },
        tabBarActiveTintColor: "#418B64",
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
          tabBarIcon: ({ color }) => <SimpleLineIcons name="home" size={30} color={color} />,
          tabBarLabelStyle: { 
            width: 40,
            height: 14,
            top: -12,
            fontFamily: "Source Sans Pro",
            fontWeight: "400",
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 14,
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialIcons name="favorite-border" size={30} color={color} />,
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
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <SimpleLineIcons name="bag" size={30} color={color} />,
          tabBarLabelStyle: { 
            width: 25,
            height: 14,
            top: -12,
            fontFamily: "Source Sans Pro",
            fontWeight: "400",
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 14,
          },

        }}
      />
    </Tabs>
  );
}
