import { Settings } from "../../../state/settings/types";

interface TipTextProps {
  text: string;
  secondsLeft: number;
  volumePercent: number;
  totalVolume: number;
  waterVolumeUnit: WaterVolumeUnit;
}

interface WaterVolumeUnit {
  getPreferredValue: (volume: number) => number;
  unit: {
    title: string;
  };
}

export const formatTipText = ({
  text,
  secondsLeft,
  volumePercent,
  totalVolume,
  waterVolumeUnit,
}: TipTextProps) => {
  const { getPreferredValue, unit } = waterVolumeUnit;
  const value = getPreferredValue(volumePercent * totalVolume);

  return text
    .replace("**seconds**", `${secondsLeft} seconds`)
    .replace("**grams**", `${value} ${unit.title}`);
};

export const getValueUnit = (unitType: any, value: number) =>
  `${unitType.getPreferredValue(value)} ${unitType.unit.title}`;

export const withBloomFn =
  (props: { settings: Settings }) => (duration: number) =>
    props.settings.bloomDuration + duration;
