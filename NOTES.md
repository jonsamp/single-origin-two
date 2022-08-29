# Notes

## August 16, 2022

- TODO: make sure when recording grind setting and temp, that they actually get recorded.
- Fixed a bug where the incrementing a slider with the plus and minus buttons sometimes would not show the correct value.
- Updated the grind instructions to display a range of grind settings.

## August 9, 2022 - August 10, 2022

- Removed onboarding
- Upgraded to tailwind-rn 4+
- Include grind ranges:
  - Add grind ranges to each grinder + make enums for them all
  - Add a grind range to all recipes that it should show
  - Then figure out how it would work with saving data for a particular grinder + ranges. Can I let people edit a grinder that already exists?
  - Then I need to add UI to let people add a custom grinder
    - Add a "Add grinder" button that goes to a new route.
    - New route needs to let people input name of grinder, specify low to highest range, then lets the user input from/to for each coarseness, then they can save. There doesn't really need to be validation for the nubmers, since there could be overlap. I could fill in all the numbers be default with using math.
    - Then let people edit them with an "edit" button in the top right.
    - Once saved in settings, then I need to update the "grind coffee" step to get the saved grinder if there is one. If not, then fall back to the one selected.
    - If I let people update the existing ones, I need a "reset to default" on them (that only exists for the grinders I provide).

## July 20, 2022

- Upgrading to SDK 46.
- Removed Amplitude since it's no longer included in Expo's SDK. Adding the real library (@amplitude/react-native@latest) requires a prebuilt project. Since I don't use the tracking data, removing it entirely (useTracking hook and shareTrackingData setting).

## November 27, 2021 (afternoon)

Removed providers, removed global types, and added hooks for tracking and settings.

## November 27, 2021 (2AM)

Finished with removing `withTheme()`.

After that, make a hook for `withSettings()` (`useSettings()`).

After that, make a hook for `withTracking()` (`useTracking()`).

After that, fix lint/prettier/tsc.

Might look for `colors` and `styles.`, since those are old styles.

## August 8, 2021

Added tailwind and @expo/styleguide-native. The goal is to remove `withTheme()`, and replace styles and colors with `theme` and `tw()`.

`<Card />` is the first component I converted.

How to:

1. Import tailwind

```tsx
import { useTailwind } from 'tailwind-rn';
```

2. Add hook

```tsx
const tw = useTailwind();
```

3. Use tailwind:

```tsx
<View style={[shadows.small, tw('rounded-lg mb-8'), containerStyle]}>
```

To add new colors to tailwind, so that I can invoke them in `tw()` styles, edit **src/common/theme.tsx** under the `custom` property in the `useTailwind()` function. I should have to add colors like `'bg-default'` there.

I completed `<Card>`, `<Image>`, and `<InstructionalCard>`.

I also started added a **src/common/typography.ts**, which is a copy of the former **type.ts** file, but now injected into tailwind so i can do stuff like `tw('headline')`.

Just completed the `<Slider >` component on 8/27
