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
import { useFocusEffect } from "@react-navigation/native";
import ConnectionStatus from "./ConnectionStatus";
import Card from "./Card";

import { styles } from "./styles";

export default function Details(props) {
  const type = props.route.params.type;
  const item = props.route.params.item;
  const credits = props.route.params.credits;
  //const [credits, setCredits] = useState(null);

  async function fetchCredits() {
    if (type == "movie") {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          item.id +
          "/credits?api_key=1355d4fa4ebc328071668f2d43077d83"
      );

      const json = await response.json();
      setCredits(json);
      console.log("fetched " + json);
    }
  }

  function onPressHandler(type, newItem) {
    if (type == "movie") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            newItem.id +
            "/credits?api_key=1355d4fa4ebc328071668f2d43077d83"
        );

        const json = await response.json();
        console.log("fetched " + json);
        props.navigation.navigate("Details", {
          type: "movie",
          item: newItem,
          credits: json,
        });
      };
    } else if (type == "show") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/" +
            newItem.id +
            "/aggregate_credits?api_key=1355d4fa4ebc328071668f2d43077d83"
        );

        const json = await response.json();
        console.log("fetched " + json);
        props.navigation.navigate("Details", {
          type: "movie",
          item: newItem,
          credits: json,
        });
      };
    } else if (type == "person") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/person/" +
            newItem.id +
            "/combined_credits?api_key=1355d4fa4ebc328071668f2d43077d83"
        );

        const json = await response.json();
        console.log("fetched " + json);
        props.navigation.navigate("Details", {
          type: "person",
          item: newItem,
          credits: json,
        });
      };
    }
  }
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("state", () => {
      //fetchCredits();
      console.log(credits);
    });
    return unsubscribe;
  }, [props.navigation]);

  if (type == "movie") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView>
          <Text>{item.title}</Text>
          <Text>{item.release_date}</Text>
          <Text>{item.overview}</Text>
          <View style={styles.cardContainer}>
            {credits.cast.map((person, index) => {
              return (
                <Card
                  title={person.name}
                  source={{
                    uri:
                      "https://image.tmdb.org/t/p/w185" + person.profile_path,
                  }}
                  onSwipe={onPressHandler("person", person)}
                  key={index}
                >
                  <Text>{person.character}</Text>
                </Card>
              );
            })}
          </View>
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
          <View style={styles.cardContainer}>
            {credits.cast.map((person, index) => {
              return (
                <Card
                  title={person.name}
                  source={{
                    uri:
                      "https://image.tmdb.org/t/p/w185" + person.profile_path,
                  }}
                  onSwipe={onPressHandler("person", person)}
                  key={index}
                >
                  <Text>{person.character}</Text>
                </Card>
              );
            })}
          </View>
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
          <View style={styles.cardContainer}>
            {credits.cast.map((work, index) => {
              return (
                <Card
                  title={work.title || work.name}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w185" + work.poster_path,
                  }}
                  onSwipe={
                    work.title
                      ? onPressHandler("movie", work)
                      : work.name && onPressHandler("show", work)
                  }
                  key={index}
                >
                  <Text>{work.release_date || work.first_air_date}</Text>
                </Card>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
