import React, { ReactNode } from 'react';
import { View } from 'react-native';
import withTheme from '@app/providers/theme';

type CardProps = {
  theme: any;
  children: ReactNode;
  style: object;
};

function Card({ theme, children, style }: CardProps) {
  return (
    <View
      style={{
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowRadius: 10,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 1,
        backgroundColor: theme.grey1,
        borderRadius: 8,
        marginBottom: 40,
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: theme.grey1,
          borderRadius: 8,
          minHeight: 16,
          ...style,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default withTheme(Card);
