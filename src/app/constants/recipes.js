import React from 'react'
import KalitaWave185Icon from './icons/KalitaWave185Icon'
import KalitaWave155Icon from './icons/KalitaWave155Icon'
import CleverIcon from './icons/CleverIcon'

export default {
  Aeropress: {
    title: 'Aeropress',
    id: 'Aeropress',
    icon: () => {},
  },
  Chemex: {
    title: 'Chemex',
    id: 'Chemex',
    icon: () => {},
  },
  Clever: {
    title: 'Clever',
    id: 'Clever',
    icon: ({ fill, size }) => <CleverIcon fill={fill} size={size} />,
  },
  FrenchPress: {
    title: 'French Press',
    id: 'FrenchPress',
    icon: () => {},
  },
  IcedPourOver: {
    title: 'Iced Pour Over',
    id: 'IcedPourOver',
    icon: () => {},
  },
  KalitaWave185: {
    title: 'Kalita Wave',
    modifier: '185',
    id: 'KalitaWave185',
    icon: ({ fill, size }) => <KalitaWave185Icon fill={fill} size={size} />,
  },
  KalitaWave155: {
    title: 'Kalita Wave',
    modifier: '155',
    id: 'KalitaWave155',
    icon: ({ fill, size }) => <KalitaWave155Icon fill={fill} size={size} />,
  },
  V60: {
    title: 'V60',
    id: 'V60',
    icon: () => {},
  },
}
