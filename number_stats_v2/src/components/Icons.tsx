import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icons = ({
  id,
  color,
  size,
}: {
  id: string;
  color: string;
  size: number;
}) => {
  return <MaterialCommunityIcons name={id} color={color} size={size} />;
};

export default Icons;
