import React from 'react';
import en from "../data/locales/en";
import zh from "../data/locales/zh";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.fallbacks = true;
i18n.translations = { "zh-Hans": zh, en: en };
i18n.locale = Localization.locale;

export default i18n;