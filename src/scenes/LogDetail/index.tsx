import { RouteProp } from '@react-navigation/core';
import React from 'react';
import Log from '../../components/Log';
import { RootStackParamList } from '../../navigation';

type Props = {
  timestamp: number;
  route: RouteProp<RootStackParamList, 'LogDetail'>;
};

function LogDetail(props: Props) {
  const { route } = props;
  const timestamp = route.params && route.params.timestamp;

  return <Log timestamp={timestamp} />;
}

export default LogDetail;
