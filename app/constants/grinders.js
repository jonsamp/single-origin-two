const grinders = {
  generic: {
    title: 'Generic grinder (1-10)',
    shortTitle: 'grinder',
    id: 'generic',
    min: 1,
    max: 10,
  },
  encore: {
    title: 'Baratza Encore (1-40)',
    shortTitle: 'Baratza Encore',
    id: 'encore',
    min: 1,
    max: 40,
  },
  virtuoso: {
    title: 'Baratza Virtuoso (1-40)',
    shortTitle: 'Baratza Virtuoso',
    id: 'virtuoso',
    min: 1,
    max: 40,
  },
  infinity: {
    title: 'Capresso Infinity (0-10)',
    shortTitle: 'Capresso Infinity',
    id: 'infinity',
    min: 0,
    max: 10,
  },
  cuisinart: {
    title: 'Cuisinart DBM-8 (1-18)',
    shortTitle: 'Capresso DBM-8',
    id: 'cuisinart',
    min: 1,
    max: 18,
  },
};

const getVerboseSetting = percent => {
  const interval = 0.14285714286;
  if (percent <= interval) {
    return 'extra fine';
  } else if (percent <= interval * 2) {
    return 'fine';
  } else if (percent <= interval * 3) {
    return 'medium fine';
  } else if (percent <= interval * 4) {
    return 'medium';
  } else if (percent <= interval * 5) {
    return 'medium coarse';
  } else if (percent <= interval * 6) {
    return 'coarse';
  }
  return 'extra coarse';
};

export { grinders, getVerboseSetting };
