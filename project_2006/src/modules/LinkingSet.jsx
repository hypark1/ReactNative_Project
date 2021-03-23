import React from 'react';
import {Linking, Platform} from "react-native";
import SafariView from "react-native-safari-view";

/*웹페이지 띄우기*/
const LinkingSet = (value) => {
    if (Platform.OS === 'android') {
        Linking.openURL(value);
    } else {
        SafariView.show({ url: value });
    }
};

export default LinkingSet;
