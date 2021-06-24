import React from 'react';
import { Alert } from "react-native";
import I18n from "~/locales/I18n";
const { t } = I18n;

/*기본 확인만 있는 알럿*/
const MyAlert = (value) => {
    Alert.alert(t('alert.title'), value, [{ text: t('alert.ok') }]);
}

export default MyAlert;
