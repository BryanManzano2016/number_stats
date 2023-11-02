import React from 'react';
import {View} from 'react-native';
import styles from '../styles/Main';
import SelectDropdown from 'react-native-select-dropdown';
import Icons from '../components/Icons';

const SearchSelector = ({
  options,
  onChange,
  defaultValue,
}: {
  options: object[];
  onChange: (selectedItem: {label: string; value: string}) => void;
  defaultValue: {label: string; value: string} | undefined;
}) => {
  return (
    <View style={styles.view}>
      <SelectDropdown
        defaultValue={defaultValue}
        data={options}
        onSelect={onChange}
        buttonTextAfterSelection={(item, index) => {
          return item.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        search
        searchPlaceHolder={'Ingrese un texto'}
        searchPlaceHolderColor={'darkgrey'}
        searchInputStyle={styles.searchInputStyle}
        renderDropdownIcon={isOpened => {
          return (
            <Icons
              id={isOpened ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="gray"
            />
          );
        }}
      />
    </View>
  );
};

export default SearchSelector;
