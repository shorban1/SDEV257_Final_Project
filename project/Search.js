import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles, colors } from "./styles";

export default function Search({ onSearch }) {
  const [submittedText, setSubmittedText] = useState("");

  return (
    <>
      <TextInput
        style={styles.search}
        placeholder="Search..."
        onSubmitEditing={(e) => {
          onSearch(e);
        }}
        onFocus={() => {
          setSubmittedText("");
        }}
        placeholderTextColor={colors.placeholderText}
      />
    </>
  );
}
