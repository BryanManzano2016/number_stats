import React from 'react';
import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import styles from '../styles/Main';

const ControllerForm = ({
  control,
  name,
  label,
  maxLength = 50,
  placeHolder = '...',
  isRequired = false,
  keyboardType = 'default',
}: {
  control: any;
  name: string;
  label: string;
  maxLength: number;
  placeHolder: string;
  isRequired: boolean;
  keyboardType: any;
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
        maxLength: maxLength,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboardType}
          label={label}
        />
      )}
      name={name}
    />
  );
};

export default ControllerForm;
