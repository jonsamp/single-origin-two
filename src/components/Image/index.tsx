import React from "react";
import { Image as RNImage, ImageStyle, StyleSheet } from "react-native";
import { useTailwind } from "../../common/theme";
import { height } from "../../constants/layout";

type Props = {
  source: number;
  defaultSource?: number;
  style?: ImageStyle;
  isPlaying?: boolean;
};

export default function Image(props: Props) {
  const { source, defaultSource, style } = props;
  const tw = useTailwind();

  return (
    <RNImage
      source={source}
      // defaultSource={defaultSource}
      style={[styles.image, tw("theme.background.default"), style]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: height / 5,
  },
});
