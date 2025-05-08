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
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import ConnectionStatus from "./ConnectionStatus";
import ResponseModal from "./ResponseModal";
import Search from "./Search";
import Card from "./Card";

import { styles } from "./styles";

export default function People({ navigation }) {
  const [items, setItems] = useState([]);

  const [swipedCard, setSwipedCard] = useState("");

  function onSwipe(item) {
    return async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/" +
          item.id +
          "/combined_credits?api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const json = await response.json();
      navigation.navigate("Details", {
        type: "person",
        item: item,
        credits: json,
      });
    };
  }
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/popular?api_key=1355d4fa4ebc328071668f2d43077d83"
      );
      const items = await response.json();
      setItems(items.results);
    }

    fetchCourses();
  });
  return (
    <View style={styles.container}>
      <ConnectionStatus />
      <Search></Search>
      <ResponseModal
        title={swipedCard}
        dependency={swipedCard}
        resetDependency={() => {
          setSwipedCard("");
        }}
      ></ResponseModal>
      <ScrollView contentContatinerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {items.map((item, index) => {
            return (
              <Card
                title={item.name}
                source={{
                  uri: "https://image.tmdb.org/t/p/w154" + item.profile_path,
                }}
                onSwipe={onSwipe(item)}
                key={index}
              ></Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
