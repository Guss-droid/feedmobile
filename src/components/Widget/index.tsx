import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native"
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet"
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Options } from "../Options";
import { styles } from "./styles";
import { theme } from "../../theme";
import { Form } from "../Form";
import { Success } from "../Success";

export type FeedbackTypeProps = keyof typeof feedbackTypes

function Widget() {

  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackType, setFeedbackType] = useState<FeedbackTypeProps | null>(null)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleReturn() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>


      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ?
          <Success handleRestartFeedback={handleReturn} />
          :
          <>
            {feedbackType ?
              <Form
                feedbackChoice={feedbackType}
                onFeedbackCancel={handleReturn}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
              :
              <Options onFeedbackTypeChanged={setFeedbackType} />
            }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget)