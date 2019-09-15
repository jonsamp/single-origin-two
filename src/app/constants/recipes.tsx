import React from 'react'
import ChemexIcon from './icons/ChemexIcon'
import CleverIcon from './icons/CleverIcon'
import KalitaWave155Icon from './icons/KalitaWave155Icon'
import KalitaWave185Icon from './icons/KalitaWave185Icon'

export default {
  // Aeropress: {
  //   title: 'Aeropress',
  //   id: 'Aeropress',
  //   icon: () => {},
  // },
  Chemex: {
    title: 'Chemex',
    id: 'Chemex',
    icon: ({ fill, size }) => <ChemexIcon fill={fill} size={size} />,
  },
  Clever: {
    title: 'Clever',
    id: 'Clever',
    icon: ({ fill, size }) => <CleverIcon fill={fill} size={size} />,
  },
  IcedKalitaWave185: {
    title: 'Iced Kalita Wave',
    modifier: '185',
    iced: true,
    id: 'IcedKalitaWave185',
    icon: ({ fill, size }) => <KalitaWave185Icon fill={fill} size={size} />,
  },
  KalitaWave185: {
    title: 'Kalita Wave',
    modifier: '185',
    id: 'KalitaWave185',
    icon: ({ fill, size }) => <KalitaWave185Icon fill={fill} size={size} />,
  },
  // KalitaWave155: {
  //   title: 'Kalita Wave',
  //   modifier: '155',
  //   id: 'KalitaWave155',
  //   icon: ({ fill, size }) => <KalitaWave155Icon fill={fill} size={size} />,
  // },
  // V60: {
  //   title: 'V60',
  //   id: 'V60',
  //   icon: () => {},
  // },
}
