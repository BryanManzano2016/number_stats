import React from 'react';
import {View} from 'react-native';
import styles from '../styles/Main';
import DatePicker from 'react-native-date-picker';

const ControllerForm = ({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (value: Date) => void;
}) => {
  return (
    <View style={styles.view}>
      <DatePicker
        androidVariant="nativeAndroid"
        date={date}
        onDateChange={onDateChange}
        style={styles.datePicker}
        locale="es"
        is24hourSource="locale"
      />
    </View>
  );
};

export default ControllerForm;
