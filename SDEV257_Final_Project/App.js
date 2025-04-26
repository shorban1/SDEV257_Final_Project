import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Movies from "./Movies";
import People from "./People";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen name="People" component={People} />
        </Tab.Navigator>
      )}
      {Platform.OS == "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Movies" component={Movies} />
          <Drawer.Screen name="People" component={Peopl} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
