import { Feather } from "@expo/vector-icons";
import React from "react";
import { iconSize } from "@expo/styleguide-native";
import { TouchableOpacity, View } from "react-native";
import Card from "../../../../components/Card";
import Instructions from "../../../../components/Instructions";
import { useTailwind, useTheme } from "../../../../common/theme";

interface Props {
  navigation: any;
  recipe: string;
  preparation: Array<{
    image?: number;
    text: string;
  }>;
}

function Preparation(props: Props) {
  const { navigation, recipe, preparation } = props;
  const { theme } = useTheme();
  const tw = useTailwind();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Preparation", preparation)}
      activeOpacity={0.7}
    >
      <Card>
        <View style={tw("flex-row items-center pr-4")}>
          <View style={{ flex: 1 }}>
            <Instructions text={`Prepare your ${recipe}.`} />
          </View>
          <Feather
            name="chevron-right"
            size={iconSize.regular}
            color={theme.icon.default}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default Preparation;
