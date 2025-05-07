import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ConnectionStatus from "./ConnectionStatus";

import { styles } from "./styles";

export default function Details(props) {
  const type = props.route.params.type;
  const item = props.route.params.item;

  function onPressHandler(item) {
    if (item.title) {
      return () =>
        props.navigation.navigate("Details", { type: "movie", item: item });
    } else if (item.name) {
      return () =>
        props.navigation.navigate("Details", { type: "show", item: item });
    }
  }

  if (type == "movie") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView>
          <Text>{item.title}</Text>
          <Text>{item.release_date}</Text>
          <Text>{item.overview}</Text>
        </ScrollView>
      </View>
    );
  } else if (type == "show") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView>
          <Text>{item.name}</Text>
          <Text>{item.first_air_date}</Text>
          <Text>{item.overview}</Text>
        </ScrollView>
      </View>
    );
  } else if (type == "person") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView>
          <Text>{item.name}</Text>
          <Text>
            {item.gender == 1 && "Female"}
            {item.gender == 2 && "Male"}
          </Text>
          {item.known_for.map((knownFor, index) => {
            return (
              <TouchableOpacity key={index} onPress={onPressHandler(knownFor)}>
                <Text>{knownFor.title || knownFor.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
