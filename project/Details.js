import React, { useState, useEffect, useRef } from "react";
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
import LazyImage from "./LazyImage";

export default function Details(props) {
  const type = props.route.params.type;
  const item = props.route.params.item;
  const credits = props.route.params.credits;

  const scrollRef = useRef();

  function onPressHandler(newType, newItem) {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    if (newType == "movie") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            newItem.id +
            "?api_key=1355d4fa4ebc328071668f2d43077d83&append_to_response=credits"
        );

        const json = await response.json();
        props.navigation.navigate("Details", {
          type: "movie",
          item: json,
        });
      };
    } else if (newType == "show") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/" +
            newItem.id +
            "?api_key=1355d4fa4ebc328071668f2d43077d83&append_to_response=aggregate_credits"
        );

        const json = await response.json();
        props.navigation.navigate("Details", {
          type: "show",
          item: json,
        });
      };
    } else if (newType == "person") {
      return async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/person/" +
            newItem.id +
            "?api_key=1355d4fa4ebc328071668f2d43077d83&append_to_response=combined_credits"
        );

        const json = await response.json();
        props.navigation.navigate("Details", {
          type: "person",
          item: json,
        });
      };
    }
  }

  if (type == "movie") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView ref={scrollRef}>
          <LazyImage
            style={{ width: "100%", height: 200 }}
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
            }}
          />
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.bodyText}>{item.overview}</Text>
          <Text style={styles.labelText}>
            {"Release Date: " + item.release_date}
          </Text>
          <Text style={styles.labelText}>{"Runtime: " + item.runtime}</Text>
          <Text style={styles.labelText}>{"Revenue: $" + item.revenue}</Text>
          <Text style={styles.subtitleText}>Cast:</Text>
          <View style={styles.cardContainer}>
            {item.credits.cast.map((person, index) => {
              if (!person.adult && index < 100) {
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
                    <Text style={styles.cardText}>{person.character}</Text>
                  </Card>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  } else if (type == "show") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView ref={scrollRef}>
          <LazyImage
            style={{ width: "100%", height: 200 }}
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
            }}
          />
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={styles.bodyText}>{item.overview}</Text>
          <Text style={styles.labelText}>
            {"First Aired: " + item.first_air_date}
          </Text>
          <Text style={styles.labelText}>
            {"Seasons " + item.last_episode_to_air.season_number}
          </Text>
          <Text style={styles.subtitleText}>Cast:</Text>
          <View style={styles.cardContainer}>
            {item.aggregate_credits.cast.map((person, index) => {
              if (!person.adult && index < 100) {
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
                    <Text style={styles.cardText}>{person.character}</Text>
                  </Card>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  } else if (type == "person") {
    return (
      <View style={styles.container}>
        <ConnectionStatus />
        <ScrollView ref={scrollRef}>
          <View style={styles.flexRow}>
            <LazyImage
              style={styles.personImage}
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + item.profile_path,
              }}
            />
            <View style={styles.personInfo}>
              <Text style={styles.personTitle}>{item.name}</Text>
              <Text style={styles.labelText}>
                Gender: {item.gender == 1 && "Female"}
                {item.gender == 2 && "Male"}
              </Text>
              <Text style={styles.labelText}>
                Born: {item.birthday + " " + item.place_of_birth}
              </Text>
              {item.deathday && (
                <Text style={styles.labelText}>Died: {item.deathday}</Text>
              )}
            </View>
          </View>
          <Text style={styles.subtitleText}>Biography</Text>
          <ScrollView style={styles.bioContainer}>
            <Text style={styles.bioText}>{item.biography}</Text>
          </ScrollView>
          <Text style={styles.subtitleText}>Appears In:</Text>
          <View style={styles.cardContainer}>
            {item.combined_credits.cast.map((work, index) => {
              if (!work.adult && index < 100) {
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
                    <Text style={styles.cardText}>
                      {work.release_date || work.first_air_date}
                    </Text>
                  </Card>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
