import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {isEmpty} from 'lodash';
import Category from '../core/db/models/Category';
import {Results} from 'realm/dist/bundle';

export const resetDropdown = (
  categories: Results<Category>,
  selectedCategorySelector: OptionSelector | undefined,
  setSelectedCategorySelector: React.Dispatch<
    React.SetStateAction<OptionSelector | undefined>
  >,
  dropdownRef: React.RefObject<SelectDropdown>,
) => {
  const selected = [...categories].filter(
    item => item._id === selectedCategorySelector?.value,
  );
  if (selectedCategorySelector !== undefined && isEmpty(selected)) {
    setSelectedCategorySelector(undefined);
    if (dropdownRef?.current) {
      dropdownRef.current.reset();
    }
  }
};
