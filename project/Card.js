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
import LazyImage from "./LazyImage";

import { styles } from "./styles";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={props.onSwipe}>
        <LazyImage style={styles.cardImage} source={props.source} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{props.title}</Text>
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
}
