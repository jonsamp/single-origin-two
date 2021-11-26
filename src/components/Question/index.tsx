import React from "react";
import { Text, View } from "react-native";

import { useTailwind } from "../../common/theme";

type Props = {
  title: string;
  description: string;
};

function Question(props: Props) {
  const { title, description } = props;
  const tw = useTailwind();

  return (
    <View style={tw("p-5")}>
      <Text style={tw("headline theme.text.default")}>{title}</Text>
      {description ? (
        <Text style={tw("callout theme.text.secondary mt-1")}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

export default Question;
