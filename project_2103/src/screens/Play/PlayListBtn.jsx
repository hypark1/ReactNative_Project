import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from "~/locales/I18n";
import MyButton from '~/component/MyButton';
import Style from '~/styles/Style';
import Config from "react-native-config";

const { t } = I18n;

const PlayListBtn = (props) => {
    const SetBtnDom = useCallback(() => {
        let dom;
        if (Config.ENV === 'dev') {
            dom = (
                <View>
                    <MyButton text={t('play.startBtn')}
                              type={'primary'}
                              style={Style.btnSm}
                              onPress={() => props.PostStudentInfo()}/>
                </View>
            )
        } else {
            if (props.clock) {
                /*수업 ok*/
                dom = (
                    <View>
                        <MyButton text={t('play.startBtn')}
                                  type={'primary'}
                                  style={Style.btnSm}
                                  onPress={() => props.PostStudentInfo()}/>
                    </View>
                )
            } else {
                /*수업 no*/
                dom = (
                    <MyButton text={t('play.startBtn')}
                                type={'gray'}
                                style={Style.btnSm} />
                )
            }
        }
        return dom;
    }, [props]);

  return (
      <>
          <View style={Style.btnBox}>
              { SetBtnDom() }
          </View>
      </>
  );
};

const styles = StyleSheet.create({
});

export default memo(PlayListBtn);
