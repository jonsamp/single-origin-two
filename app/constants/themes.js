const greys = {
  grey1: '#F7F7F7',
  grey2: '#EFEFEF',
  grey3: '#CFCFCF',
  grey4: '#595959',
  grey5: '#262626',
  grey6: '#000000',
};

export default {
  light: {
    foreground: greys.grey5,
    background: greys.grey1,
    primary: '#00CA9D',
    grey1: '#F7F7F7',
    grey2: '#EFEFEF',
    grey3: '#CFCFCF',
    grey4: '#595959',
    grey5: '#262626',
    grey6: '#000000',
  },
  dark: {
    foreground: greys.grey3,
    background: greys.grey5,
    primary: '#00CA9D',
    grey1: greys.grey6,
    grey2: greys.grey5,
    grey3: greys.grey4,
    grey4: greys.grey3,
    grey5: greys.grey2,
    grey6: greys.grey1,
  },
};
