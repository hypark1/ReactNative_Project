import React from 'react';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';

/*애널리틱스 함수*/
const AnalyticsSet = (type, title) => {
    if (Config.ENV !== 'dev') {
        /*프로덕션에서만 적용되도록*/
        if (type === 'screen') {
            firebase.analytics().setCurrentScreen(title);
        } else if (type === 'click') {
            firebase.analytics().logEvent(title);
        }
    }
};

export default AnalyticsSet;
