import i18n from 'i18next';
import * as React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { makeDecorator } from '@storybook/addons';

const withTranslationWrapper = story => {
  const i18NextInstance = i18n.use(initReactI18next);
  i18NextInstance.init({
    lng: 'en',
    debug: false,
  });
  return <I18nextProvider i18n={i18NextInstance}>{story()}</I18nextProvider>;
};

export const withTranslation = makeDecorator({
  name: 'withTranslation',
  parameterName: 'i18next',
  wrapper: getStory => withTranslationWrapper(getStory),
});
