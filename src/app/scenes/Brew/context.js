import React from 'react';

const BrewContext = React.createContext({});

export const BrewProvider = BrewContext.Provider;
export const BrewConsumer = BrewContext.Consumer;
