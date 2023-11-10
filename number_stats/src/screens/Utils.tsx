import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {isEmpty} from 'lodash';
import Category from '../core/db/models/Category';
import {Results} from 'realm/dist/bundle';
import {setItem} from '../core/SimpleStorage';

export const evaluateDropdown = (
  categories: Results<Category> | undefined,
  selectedCategorySelector: OptionSelector | undefined,
  setSelectedCategorySelector: React.Dispatch<
    React.SetStateAction<OptionSelector | undefined>
  >,
  dropdownRef: React.RefObject<SelectDropdown>,
) => {
  if (categories && selectedCategorySelector && dropdownRef) {
    const selectedList = [...categories].filter(
      item =>
        item._id === selectedCategorySelector?.value &&
        item.value === selectedCategorySelector?.label,
    );
    if (selectedCategorySelector !== undefined && isEmpty(selectedList)) {
      setSelectedCategorySelector(undefined);
      if (dropdownRef?.current) {
        dropdownRef.current.reset();
      }
    }
    if (!isEmpty(selectedList)) {
      setItem('idCategory', selectedList[0]._id);
    }
  }
};
