import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import es from './es';
import {isEmpty} from 'lodash';

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {en, es},
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const replaceParams = (
  text: string,
  params: [string, string | number][],
) => {
  let modifiedString = text;

  if (['', undefined].includes(modifiedString) || isEmpty(params)) {
    return modifiedString;
  }

  params.forEach(([searchValue, replaceValue]) => {
    const pattern = '#{' + searchValue + '}';
    modifiedString = modifiedString.replaceAll(
      pattern,
      replaceValue.toString(),
    );
  });

  return modifiedString;
};
