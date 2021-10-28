const tempUnits = {
  fahrenheit: {
    title: 'fahrenheit',
    id: 'fahrenheit',
    symbol: '°F',
  },
  celsius: {
    title: 'celsius',
    id: 'celsius',
    symbol: '°C',
  },
}

const weightUnits = {
  grams: {
    title: 'grams',
    id: 'grams',
    symbol: 'g',
  },
  ounces: {
    title: 'ounces',
    id: 'ounces',
    symbol: 'oz',
  },
  cups: {
    title: 'cups',
    id: 'cups',
    symbol: 'cups',
  },
}

const units = {
  ...weightUnits,
  ...tempUnits,
}

export { tempUnits, weightUnits, units }
