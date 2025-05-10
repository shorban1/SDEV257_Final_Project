import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Platform, Switch } from "react-native";
import Movies from "./Movies";
import Shows from "./Shows";
import People from "./People";
import Details from "./Details";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import { styles, colors } from "./styles";

function NavigationOptions() {
  return (
    <>
      {Platform.OS === "ios" && (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: colors.navigationBackground },
          }}
        >
          <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
          <Tab.Screen
            name="Shows"
            component={Shows}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
          <Tab.Screen
            name="People"
            component={People}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
        </Tab.Navigator>
      )}
      {Platform.OS === "android" && (
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: { backgroundColor: colors.navigationBackground },
            drawerInactiveTintColor: colors.text,
          }}
        >
          <Drawer.Screen
            name="Movies"
            component={Movies}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
          <Drawer.Screen
            name="Shows"
            component={Shows}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
          <Drawer.Screen
            name="People"
            component={People}
            options={{
              headerStyle: {
                backgroundColor: colors.navigationBackground,
              },
              headerTitleStyle: {
                color: colors.navigationText,
              },
            }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.navigator}>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={NavigationOptions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: colors.navigationBackground,
            },
            headerTitleStyle: {
              color: colors.navigationText,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
