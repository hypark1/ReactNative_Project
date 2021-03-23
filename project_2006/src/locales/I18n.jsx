import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import ko from "~/locales/ko";
import en from "~/locales/en";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
    I18n.locale = locales[0].languageTag;
}
I18n.locale = 'ko-KR';

I18n.fallbacks = true;
I18n.translations = {
    en,
    ko
};

export default I18n;
