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
import Search from "./Search";
import Card from "./Card";

import { styles } from "./styles";

export default function Shows({ navigation }) {
  const [items, setItems] = useState([]);

  function onSwipe(item) {
    return async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/" +
          item.id +
          "?api_key=1355d4fa4ebc328071668f2d43077d83&append_to_response=aggregate_credits"
      );

      const json = await response.json();
      navigation.navigate("Details", {
        type: "show",
        item: json,
      });
    };
  }
  async function onSearch(e) {
    if (e.nativeEvent.text.length > 0) {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/tv?query=" +
          e.nativeEvent.text +
          "&include_adult=false&language=en-US&page=1&api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const json = await response.json();
      setItems(json.results);
      console.log(JSON.stringify(json));
    } else {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const json = await response.json();
      setItems(json.results);
      console.log(JSON.stringify(json));
    }
  }
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const json = await response.json();
      setItems(json.results);
    }

    fetchMovies();
  }, []);
  return (
    <View style={styles.container}>
      <ConnectionStatus />
      <Search onSearch={onSearch} styleSet={styles}></Search>
      <ScrollView contentContatinerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {items.map((item, index) => {
            if (!item.adult) {
              return (
                <Card
                  title={item.name}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w185" + item.poster_path,
                  }}
                  onSwipe={onSwipe(item)}
                  key={index}
                ></Card>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
}
