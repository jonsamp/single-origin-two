import coarse from './images/coarse.jpeg';
import extraCoarse from './images/extra-coarse.jpeg';
import extraFine from './images/extra-fine.jpeg';
import fine from './images/fine.jpeg';
import mediumCoarse from './images/medium-coarse.jpeg';
import mediumFine from './images/medium-fine.jpeg';
import medium from './images/medium.jpeg';

export enum GrindRangeName {
  EXTRA_FINE = 'extra-fine',
  FINE = 'fine',
  MEDIUM_FINE = 'medium-fine',
  MEDIUM = 'medium',
  MEDIUM_COARSE = 'medium-coarse',
  COARSE = 'coarse',
  EXTRA_COARSE = 'extra-coarse',
}

export type GrindRange = {
  from: number;
  to: number;
};

export function getVerboseSetting(grindRange: GrindRangeName) {
  return String(grindRange).replace('-', ' ');
}

export function getGrindImage(grindRange: GrindRangeName) {
  switch (grindRange) {
    case GrindRangeName.EXTRA_FINE:
      return extraFine;
    case GrindRangeName.FINE:
      return fine;
    case GrindRangeName.MEDIUM_FINE:
      return mediumFine;
    case GrindRangeName.MEDIUM:
      return medium;
    case GrindRangeName.MEDIUM_COARSE:
      return mediumCoarse;
    case GrindRangeName.COARSE:
      return coarse;
    case GrindRangeName.EXTRA_COARSE:
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRangeName.FINE]: {
        from: 2,
        to: 3,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 3,
        to: 4,
      },
      [GrindRangeName.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRangeName.COARSE]: {
        from: 7,
        to: 8,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 1,
        to: 5,
      },
      [GrindRangeName.FINE]: {
        from: 5,
        to: 10,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 10,
        to: 15,
      },
      [GrindRangeName.MEDIUM]: {
        from: 15,
        to: 20,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 20,
        to: 25,
      },
      [GrindRangeName.COARSE]: {
        from: 25,
        to: 30,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 1,
        to: 5,
      },
      [GrindRangeName.FINE]: {
        from: 5,
        to: 10,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 10,
        to: 15,
      },
      [GrindRangeName.MEDIUM]: {
        from: 15,
        to: 20,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 20,
        to: 25,
      },
      [GrindRangeName.COARSE]: {
        from: 25,
        to: 30,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 0,
        to: 1,
      },
      [GrindRangeName.FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRangeName.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRangeName.COARSE]: {
        from: 7,
        to: 8,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRangeName.FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 4,
        to: 7,
      },
      [GrindRangeName.MEDIUM]: {
        from: 7,
        to: 10,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 10,
        to: 13,
      },
      [GrindRangeName.COARSE]: {
        from: 13,
        to: 16,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 0,
        to: 2,
      },
      [GrindRangeName.FINE]: {
        from: 2,
        to: 4,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 4,
        to: 6,
      },
      [GrindRangeName.MEDIUM]: {
        from: 6,
        to: 8,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 8,
        to: 10,
      },
      [GrindRangeName.COARSE]: {
        from: 10,
        to: 12,
      },
      [GrindRangeName.EXTRA_COARSE]: {
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
      [GrindRangeName.EXTRA_FINE]: {
        from: 1,
        to: 2,
      },
      [GrindRangeName.FINE]: {
        from: 2,
        to: 3,
      },
      [GrindRangeName.MEDIUM_FINE]: {
        from: 3,
        to: 4,
      },
      [GrindRangeName.MEDIUM]: {
        from: 4,
        to: 6,
      },
      [GrindRangeName.MEDIUM_COARSE]: {
        from: 6,
        to: 7,
      },
      [GrindRangeName.COARSE]: {
        from: 7,
        to: 10,
      },
      [GrindRangeName.EXTRA_COARSE]: {
        from: 10,
        to: 11,
      },
    },
  },
};
