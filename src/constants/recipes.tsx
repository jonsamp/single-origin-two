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

import AeropressImage from './recipeImages/aeropress-card.jpg'
import BeehouseImage from './recipeImages/beehouse-card.png'
import ChemexImage from './recipeImages/chemex-card.png'
import CleverImage from './recipeImages/clever-card.png'
import EvaSoloImage from './recipeImages/eva-solo-card.png'
import FrenchPressImage from './recipeImages/french-press-card.png'
import IcedCoffeeImage from './recipeImages/ice-chemex-card.jpg'
import KalitaWaveImage from './recipeImages/kalita-wave-card.png'
import V60Image from './recipeImages/v60-card.jpg'

export default {
  Aeropress: {
    title: 'Aeropress',
    id: 'Aeropress',
    modifier: 'Inverted',
    icon: ({ fill, size }) => <AeropressIcon fill={fill} size={size} />,
    image: AeropressImage,
  },
  Beehouse: {
    title: 'Beehouse',
    id: 'Beehouse',
    icon: ({ fill, size }) => <BeehouseIcon fill={fill} size={size} />,
    image: BeehouseImage,
  },
  Chemex: {
    title: 'Chemex',
    id: 'Chemex',
    icon: ({ fill, size }) => <ChemexIcon fill={fill} size={size} />,
    image: ChemexImage,
  },
  Chemex3Cup: {
    title: 'Chemex',
    modifier: '3 Cup',
    id: 'Chemex3Cup',
    icon: ({ fill, size }) => <Chemex3CupIcon fill={fill} size={size} />,
    image: ChemexImage,
  },
  Clever: {
    title: 'Clever',
    id: 'Clever',
    icon: ({ fill, size }) => <CleverIcon fill={fill} size={size} />,
    image: CleverImage,
  },
  EvaSolo: {
    title: 'Eva Solo',
    id: 'EvaSolo',
    icon: ({ fill, size }) => <EvaSoloIcon fill={fill} size={size} />,
    image: EvaSoloImage,
  },
  FrenchPress3Cup: {
    title: 'French Press',
    modifier: '3 Cup',
    id: 'FrenchPress3Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
    image: FrenchPressImage,
  },
  FrenchPress4Cup: {
    title: 'French Press',
    modifier: '4 Cup',
    id: 'FrenchPress4Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
    image: FrenchPressImage,
  },
  FrenchPress8Cup: {
    title: 'French Press',
    modifier: '8 Cup',
    id: 'FrenchPress8Cup',
    icon: ({ fill, size }) => <FrenchPressIcon fill={fill} size={size} />,
    image: FrenchPressImage,
  },
  KalitaWave185: {
    title: 'Kalita Wave',
    modifier: '185',
    id: 'KalitaWave185',
    icon: ({ fill, size }) => <KalitaWave185Icon fill={fill} size={size} />,
    image: KalitaWaveImage,
  },
  KalitaWave155: {
    title: 'Kalita Wave',
    modifier: '155',
    id: 'KalitaWave155',
    icon: ({ fill, size }) => <KalitaWave155Icon fill={fill} size={size} />,
    image: KalitaWaveImage,
  },
  V60: {
    title: 'V60',
    id: 'V60',
    modifier: '#02',
    icon: ({ fill, size }) => <V60Icon fill={fill} size={size} />,
    image: V60Image,
  },
  V6001: {
    title: 'V60',
    id: 'V6001',
    modifier: '#01',
    icon: ({ fill, size }) => <V6001Icon fill={fill} size={size} />,
    image: V60Image,
  },
}
