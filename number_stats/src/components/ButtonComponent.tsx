import React from 'react';
import {Button} from 'react-native-paper';
import {Keyboard} from 'react-native';

export const ButtonComponent = ({
  disabled,
  dismissKeyboard = false,
  text,
  onPress,
  mode = 'contained',
}: {
  disabled?: boolean;
  dismissKeyboard?: boolean;
  onPress: any;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  text: string;
}) => {
  const onPressAction = () => {
    if (dismissKeyboard) {
      Keyboard.dismiss();
    }
    onPress();
  };

  return (
    <Button disabled={disabled} mode={mode} onPress={onPressAction}>
      {text}
    </Button>
  );
};
