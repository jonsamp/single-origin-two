import coarse from "./images/coarse.jpeg";
import extraCoarse from "./images/extra-coarse.jpeg";
import extraFine from "./images/extra-fine.jpeg";
import fine from "./images/fine.jpeg";
import mediumCoarse from "./images/medium-coarse.jpeg";
import mediumFine from "./images/medium-fine.jpeg";
import medium from "./images/medium.jpeg";

const grinders = {
  generic: {
    title: "Generic grinder (1-10)",
    shortTitle: "grinder",
    id: "generic",
    min: 1,
    max: 10,
  },
  encore: {
    title: "Baratza Encore (1-40)",
    shortTitle: "Baratza Encore",
    id: "encore",
    min: 1,
    max: 40,
  },
  virtuoso: {
    title: "Baratza Virtuoso (1-40)",
    shortTitle: "Baratza Virtuoso",
    id: "virtuoso",
    min: 1,
    max: 40,
  },
  infinity: {
    title: "Capresso Infinity (0-10)",
    shortTitle: "Capresso Infinity",
    id: "infinity",
    min: 0,
    max: 10,
  },
  cuisinart: {
    title: "Cuisinart DBM-8 (1-18)",
    shortTitle: "Capresso DBM-8",
    id: "cuisinart",
    min: 1,
    max: 18,
  },
  mahlkonigEK43: {
    title: "Mahlkönig EK43 (0-16)",
    shortTitle: "Mahlkönig EK43",
    id: "mahlkonigEK43",
    min: 0,
    max: 16,
  },
  ode: {
    title: "Fellow Ode (1 - 11)",
    shortTitle: "Fellow Ode",
    id: "ode",
    min: 1,
    max: 11,
  },
};

const getVerboseSetting = (percent: number) => {
  const interval = 0.14285714286;
  if (percent <= interval) {
    return {
      title: "extra fine",
      image: extraFine,
    };
  } else if (percent <= interval * 2) {
    return {
      title: "fine",
      image: fine,
    };
  } else if (percent <= interval * 3) {
    return {
      title: "medium fine",
      image: mediumFine,
    };
  } else if (percent <= interval * 4) {
    return {
      title: "medium",
      image: medium,
    };
  } else if (percent <= interval * 5) {
    return {
      title: "medium coarse",
      image: mediumCoarse,
    };
  } else if (percent <= interval * 6) {
    return {
      title: "coarse",
      image: coarse,
    };
  }
  return {
    title: "extra coarse",
    image: extraCoarse,
  };
};

export { grinders, getVerboseSetting };
