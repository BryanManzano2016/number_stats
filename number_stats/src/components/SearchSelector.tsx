import React, {LegacyRef} from 'react';
import {View} from 'react-native';
import styles from '../styles/Main';
import SelectDropdown from 'react-native-select-dropdown';
import Icons from '../components/Icons';

const SearchSelector = ({
  defaultLabel,
  options,
  onChange,
  defaultValue,
  dropdownRef,
}: {
  defaultLabel: string;
  options: object[];
  onChange: (selectedItem: {label: string; value: string}) => void;
  defaultValue: {label: string; value: string} | undefined;
  dropdownRef: LegacyRef<SelectDropdown>;
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
        searchPlaceHolder={defaultLabel}
        defaultButtonText={defaultLabel}
        buttonTextStyle={styles.buttonTextStyle}
        searchPlaceHolderColor={'darkgrey'}
        renderDropdownIcon={isOpened => {
          return (
            <Icons
              id={isOpened ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="gray"
            />
          );
        }}
        ref={dropdownRef}
      />
    </View>
  );
};

export default SearchSelector;
