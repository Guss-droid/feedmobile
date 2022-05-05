import React from "react";
import { Text, View } from "react-native";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Card } from "../Card";
import { Copyright } from "../Copyright";
import { FeedbackTypeProps } from "../Widget";

import { styles } from "./styles";

interface IOptions {
  onFeedbackTypeChanged: (feedbackType: FeedbackTypeProps) => void;
}

export function Options({ onFeedbackTypeChanged }: IOptions) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Card
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => onFeedbackTypeChanged(key as FeedbackTypeProps)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}