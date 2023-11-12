import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from '../styles/Main';
import SelectDropdown from 'react-native-select-dropdown';
import Icons from '../components/Icons';
import {isEmpty} from 'lodash';

const SearchSelector = ({
  defaultLabel,
  options,
  onChange,
  defaultValue,
  dropdownRef,
}: {
  defaultLabel: string;
  options: {label: string; value: string}[];
  onChange: (selectedItem: {label: string; value: string}) => void;
  defaultValue: {label: string; value: string} | undefined;
  dropdownRef: React.RefObject<SelectDropdown>;
}) => {
  useEffect(() => {
    if (defaultValue && options) {
      const selectedList = options.filter(
        item =>
          item.value === defaultValue.value &&
          item.label === defaultValue.label,
      );
      if (defaultValue !== undefined && isEmpty(selectedList)) {
        if (dropdownRef?.current) {
          dropdownRef.current.reset();
        }
      }
    }
  }, [options, defaultValue, dropdownRef]);

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
