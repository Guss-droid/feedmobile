import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { api } from "../../services/api";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Button } from "../Button";
import { FeedbackTypeProps } from "../Widget"
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import { theme } from "../../theme";

interface IFeedbackChoice {
  feedbackChoice: FeedbackTypeProps;
  onFeedbackCancel: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackChoice, onFeedbackCancel, onFeedbackSent }: IFeedbackChoice) {

  const feedbackInfo = feedbackTypes[feedbackChoice]

  const [comment, setComment] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8
    }).then(uri => setScreenshot(uri))
      .catch(err => console.log(err))
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSending) {
      return
    }

    setIsSending(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {
      encoding: "base64"
    })

    try {
      await api.post("/feedbacks", {
        type: feedbackChoice,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })

      onFeedbackSent()
    } catch (err) {
      console.log(err)

      setIsSending(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancel}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo?.image}
            style={styles.image}
          />

          <Text style={styles.titleText}>
            {feedbackInfo?.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Conte com detalhes o que está acontecendo"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button
          isLoading={isSending}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}