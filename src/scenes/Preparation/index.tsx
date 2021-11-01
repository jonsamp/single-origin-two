import React, { Component } from "react";
import * as Sentry from "sentry-expo";
import { isArray } from "lodash";
import InstructionalCard from "../../components/InstructionalCard";
import ResponsiveScrollView from "../../components/ResponsiveScrollView";
import withTheme, { Theme } from "../../providers/theme";

interface PreparationProps {
  navigation: any;
  route: any;
  theme: Theme;
  isDarkTheme: boolean;
  preparation: Array<{
    image?: number;
    text: string;
  }>;
}

class Preparation extends Component<PreparationProps> {
  render() {
    const { route, theme, isDarkTheme } = this.props;
    const preparation = route.params;

    let prepSteps;

    if (isArray(preparation)) {
      prepSteps = preparation;
    } else if (!isArray(preparation) && preparation["0"]) {
      prepSteps = Object.values(preparation);
    }

    return (
      <ResponsiveScrollView
        wrapperStyle={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
      >
        {prepSteps.map((prepStep) => (
          <InstructionalCard
            key={prepStep.text}
            step={{ image: prepStep.image, description: prepStep.text }}
          />
        ))}
      </ResponsiveScrollView>
    );
  }
}

export default withTheme(Preparation);
