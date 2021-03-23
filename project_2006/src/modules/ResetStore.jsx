import React from 'react';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

/*저장되어있는 계정정보 지우기*/
const ResetStore = () => {
    let user = {
        auto: false,
        token: null
    };
    RNSecureKeyStore.set('GSP', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
    RNSecureKeyStore.set('GSP_Modal', JSON.stringify([]), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
    RNSecureKeyStore.set('GSP_ID', '', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
    RNSecureKeyStore.set('GSP_Learner', '', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
};

export default ResetStore;
