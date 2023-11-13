import i18n, {t, exists} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import es from './es';
import {get, isEmpty} from 'lodash';
import * as RNLocalize from 'react-native-localize';

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {en, es},
    fallbackLng: get(RNLocalize.getLocales(), '[0].languageCode', 'en'),
    interpolation: {
      escapeValue: false,
    },
  });
};

export const i18nReplaceParams = (
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

export const i18nGetList = (prefix: string, limit: number = 25) => {
  let listText: string[] = [];
  for (let index = 0; index < limit; index++) {
    if (exists(prefix + index)) {
      listText.push(t(prefix + index));
    } else {
      break;
    }
  }
  return listText;
};
