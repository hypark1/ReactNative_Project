import React, { memo } from 'react';
import { View } from 'react-native';
import MyText from "~/component/MyText";
import Style from "~/styles/Style";
import I18n from "~/locales/I18n";

const { t } = I18n;

/*로그인 상단 헤더*/
const LoginHeader = (props) => {
    return (
        <>
            <View style={[Style.header, Style.headerWhite]}>
                <View style={Style.headerTitle}>
                    <MyText text={t('login.title')}
                            size={'lg'}
                            weight={'6'}
                            color={'primary'}
                            align={'center'} />
                </View>
            </View>
        </>
    );
};

export default memo(LoginHeader);
