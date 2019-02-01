const tempUnits = {
  fahrenheit: {
    title: 'Fahrenheit',
    id: 'fahrenheit',
    symbol: '°F',
  },
  celsius: {
    title: 'Celsius',
    id: 'celsius',
    symbol: '°C',
  },
};

const weightUnits = {
  grams: {
    title: 'Grams',
    id: 'grams',
    symbol: 'g',
  },
  ounces: {
    title: 'Ounces',
    id: 'ounces',
    symbol: 'oz',
  },
  cups: {
    title: 'Cups',
    id: 'cups',
    symbol: 'cups',
  },
};

const units = {
  ...weightUnits,
  ...tempUnits,
};

export { tempUnits, weightUnits, units };
