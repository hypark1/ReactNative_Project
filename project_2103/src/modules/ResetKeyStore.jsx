import React from 'react';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

/*저장되어있는 계정정보 지우기*/
const ResetKeyStore = () => {
    RNSecureKeyStore.remove('ddangkongLogin');
    RNSecureKeyStore.set("ddangkongDeviceId", '', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
    RNSecureKeyStore.set("ddangkongLearner", '0', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
};

export default ResetKeyStore;
