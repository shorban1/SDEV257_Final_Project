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

export default function Movies({ navigation }) {
  const [items, setItems] = useState([]);

  const [swipedCard, setSwipedCard] = useState("");

  function onSwipe(item) {
    return () => navigation.navigate("Details", { type: "movie", item: item });
  }
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const items = await response.json();
      setItems(items.results);
    }

    fetchCourses();
  });
  return (
    <>
      <ConnectionStatus />
      <Search></Search>
      <ResponseModal
        title={swipedCard}
        dependency={swipedCard}
        resetDependency={() => {
          setSwipedCard("");
        }}
      ></ResponseModal>
      <ScrollView style={styles.container}>
        {items.map((item, index) => {
          return (
            <Card title={item.title} onSwipe={onSwipe(item)} key={index}>
              <Text>{item.overview}</Text>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
}
