import coarse from './images/coarse.jpeg';
import extraCoarse from './images/extra-coarse.jpeg';
import extraFine from './images/extra-fine.jpeg';
import fine from './images/fine.jpeg';
import mediumCoarse from './images/medium-coarse.jpeg';
import mediumFine from './images/medium-fine.jpeg';
import medium from './images/medium.jpeg';

export enum GrindRange {
  EXTRA_FINE = 'extra-fine',
  FINE = 'fine',
  MEDIUM_FINE = 'medium-fine',
  MEDIUM = 'medium',
  MEDIUM_COARSE = 'medium-coarse',
  COARSE = 'coarse',
  EXTRA_COARSE = 'extra-coarse',
}

export function getVerboseSetting(grindRange: GrindRange) {
  return String(grindRange).replace('-', '');
}

export function getGrindImage(grindRange: GrindRange) {
  switch (grindRange) {
    case GrindRange.EXTRA_FINE:
      return extraFine;
    case GrindRange.FINE:
      return fine;
    case GrindRange.MEDIUM_FINE:
      return mediumFine;
    case GrindRange.MEDIUM:
      return medium;
    case GrindRange.MEDIUM_COARSE:
      return mediumCoarse;
    case GrindRange.COARSE:
      return coarse;
    case GrindRange.EXTRA_COARSE:
      return extraCoarse;
  }
}

export const grinders = {
  generic: {
    id: 'generic',
    title: 'Generic grinder',
    min: 1,
    max: 10,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRange.FINE]: {
        from: 2,
        to: 3,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 3,
        to: 4,
      },
      [GrindRange.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRange.COARSE]: {
        from: 7,
        to: 8,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 8,
        to: 10,
      },
    },
  },
  encore: {
    id: 'encore',
    title: 'Baratza Encore',
    min: 1,
    max: 40,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 1,
        to: 5,
      },
      [GrindRange.FINE]: {
        from: 5,
        to: 10,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 10,
        to: 15,
      },
      [GrindRange.MEDIUM]: {
        from: 15,
        to: 20,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 20,
        to: 25,
      },
      [GrindRange.COARSE]: {
        from: 25,
        to: 30,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 30,
        to: 40,
      },
    },
  },
  virtuoso: {
    id: 'virtuoso',
    title: 'Baratza Virtuoso',
    min: 1,
    max: 40,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 1,
        to: 5,
      },
      [GrindRange.FINE]: {
        from: 5,
        to: 10,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 10,
        to: 15,
      },
      [GrindRange.MEDIUM]: {
        from: 15,
        to: 20,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 20,
        to: 25,
      },
      [GrindRange.COARSE]: {
        from: 25,
        to: 30,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 30,
        to: 40,
      },
    },
  },
  infinity: {
    id: 'infinity',
    title: 'Capresso Infinity',
    min: 0,
    max: 10,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 0,
        to: 1,
      },
      [GrindRange.FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRange.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRange.COARSE]: {
        from: 7,
        to: 8,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 8,
        to: 10,
      },
    },
  },
  cuisinart: {
    id: 'cuisinart',
    title: 'Cuisinart DBM-8',
    min: 1,
    max: 18,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRange.FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 4,
        to: 7,
      },
      [GrindRange.MEDIUM]: {
        from: 7,
        to: 10,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 10,
        to: 13,
      },
      [GrindRange.COARSE]: {
        from: 13,
        to: 16,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 17,
        to: 18,
      },
    },
  },
  mahlkonigEK43: {
    id: 'mahlkonigEK43',
    title: 'Mahlkönig EK43',
    min: 0,
    max: 16,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 0,
        to: 2,
      },
      [GrindRange.FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 4,
        to: 6,
      },
      [GrindRange.MEDIUM]: {
        from: 6,
        to: 8,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 8,
        to: 10,
      },
      [GrindRange.COARSE]: {
        from: 10,
        to: 12,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 12,
        to: 16,
      },
    },
  },
  ode: {
    id: 'ode',
    title: 'Fellow Ode',
    min: 1,
    max: 11,
    ranges: {
      [GrindRange.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRange.FINE]: {
        from: 2,
        to: 3,
      },
      [GrindRange.MEDIUM_FINE]: {
        from: 3,
        to: 4,
      },
      [GrindRange.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRange.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRange.COARSE]: {
        from: 7,
        to: 10,
      },
      [GrindRange.EXTRA_COARSE]: {
        from: 10,
        to: 11,
      },
    },
  },
};
