import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import successImg from "../../assets/success.png"
import { Copyright } from "../Copyright";

import { styles } from "./styles";

interface ISuccess {
  handleRestartFeedback: () => void;
}

export function Success({ handleRestartFeedback }: ISuccess) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRestartFeedback}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}