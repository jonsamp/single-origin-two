import React from 'react'
import AeropressIcon from './icons/AeropressIcon'
import BeehouseIcon from './icons/BeehouseIcon'
import Chemex3CupIcon from './icons/Chemex3CupIcon'
import ChemexIcon from './icons/ChemexIcon'
import CleverIcon from './icons/CleverIcon'
import EvaSoloIcon from './icons/EvaSoloIcon'
import FrenchPressIcon from './icons/FrenchPressIcon'
import KalitaWave155Icon from './icons/KalitaWave155Icon'
import KalitaWave185Icon from './icons/KalitaWave185Icon'
import V6001Icon from './icons/V6001Icon'
import V60Icon from './icons/V60Icon'

export default {
  Aeropress: {
    title: 'Aeropress',
    id: 'Aeropress',
    modifier: 'Inverted',
    icon: ({ fill, size }) => <AeropressIcon fill={fill} size={size} />,
  },
  Beehouse: {
    title: 'Beehouse',
    id: 'Beehouse',
    icon: ({ fill, size }) => <BeehouseIcon fill={fill} size={size} />,
  },
  Chemex: {
    title: 'Chemex',
    id: 'Chemex',
    icon: ({ fill, size }) => <ChemexIcon fill={fill} size={size} />,
  },
  Chemex3Cup: {
    title: 'Chemex',
    modifier: '3 Cup',
    id: 'Chemex3Cup',
    icon: ({ fill, size }) => <Chemex3CupIcon fill={fill} size={size} />,
  },
  Clever: {
    title: 'Clever',
    id: 'Clever',
    icon: ({ fill, size }) => <CleverIcon fill={fill} size={size} />,
  },
  EvaSolo: {
    title: 'Eva Solo',
    id: 'EvaSolo',
    icon: ({ fill, size }) => <EvaSoloIcon fill={fill} size={size} />,
  },
  FrenchPress3Cup: {
    title: 'French Press',
    modifier: '3 Cup',
    id: 'FrenchPress3Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
  },
  FrenchPress4Cup: {
    title: 'French Press',
    modifier: '4 Cup',
    id: 'FrenchPress4Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
  },
  FrenchPress8Cup: {
    title: 'French Press',
    modifier: '8 Cup',
    id: 'FrenchPress8Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
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
    modifier: '#02',
    icon: ({ fill, size }) => <V60Icon fill={fill} size={size} />,
  },
  V6001: {
    title: 'V60',
    id: 'V6001',
    modifier: '#01',
    icon: ({ fill, size }) => <V6001Icon fill={fill} size={size} />,
  },
}