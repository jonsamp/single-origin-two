# Notes

## August 8, 2021

Added tailwind and @expo/styleguide-native. The goal is to remove `withTheme()`, and replace styles and colors with `theme` and `tw()`.

`<Card />` is the first component I converted.

How to:

1. Import tailwind

```tsx
import { useTailwind } from '../../common/theme';
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
