import React, { useState, useEffect, use } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

import { styles } from "./styles";

export default function ResponseModal(props) {
  const modalProps = {
    animationType: "fade",
    transparent: true,
    visible: Boolean(props.dependency),
  };

  const modalWidth = useSharedValue(300);
  const modalHeight = useSharedValue(400);
  const modalCloseWidth = useSharedValue(300);
  const modalCloseHeight = useSharedValue(40);

  const modalAnimatedStyles = useAnimatedStyle(() => ({
    width: modalWidth.value,
    height: modalHeight.value,
  }));
  const modalCloseAnimatedStyles = useAnimatedStyle(() => ({
    width: modalCloseWidth.value,
    height: modalCloseHeight.value,
  }));

  function openModule() {
    modalWidth.value = 0;
    modalHeight.value = 0;
    modalCloseWidth.value = 0;
    modalCloseHeight.value = 0;
    modalWidth.value = withSpring(300);
    modalHeight.value = withSpring(400);
    modalCloseWidth.value = withSpring(300);
    modalCloseHeight.value = withSpring(40);
  }

  useEffect(() => {
    if (props.dependency) {
      openModule();
    }
  }, [props.dependency]);

  return (
    <>
      <Modal {...modalProps}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalInner, modalAnimatedStyles]}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{props.title}</Text>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text>{props.children}</Text>
            </ScrollView>
          </Animated.View>
          <TouchableOpacity
            style={[styles.modalClose]}
            onPress={props.resetDependency}
          >
            <Text style={styles.modalCloseText}>{"Close"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
