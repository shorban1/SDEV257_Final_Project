import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import Movies from "./Movies";
import Shows from "./Shows";
import People from "./People";
import Details from "./Details";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function NavigationOptions() {
  return (
    <>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen name="Shows" component={Shows} />
          <Tab.Screen name="People" component={People} />
        </Tab.Navigator>
      )}
      {Platform.OS == "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Movies" component={Movies} />
          <Drawer.Screen name="Shows" component={Shows} />
          <Drawer.Screen name="People" component={People} />
        </Drawer.Navigator>
      )}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={NavigationOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
