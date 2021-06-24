import React, {memo, useCallback, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {useDispatch, useSelector} from 'react-redux';
import { setLearnerSelect } from '~/actions'
import I18n from "~/locales/I18n";
import MySelectBox from '~/component/MySelectBox';
import MyButton from '~/component/MyButton';
import MyAlert from '~/component/MyAlert';
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import Style from '~/styles/Style';

const { t } = I18n;

const LearnerSelect = (props) => {
    const [value, setValue] = useState(null);
    const [index, setIndex] = useState(null);
    const learner = useSelector((store) => store.reducer.learner);
    const learner_select = useSelector((store) => store.reducer.learner_select);
    const dispatch = useDispatch();

    useEffect(() => {
        if (learner_select) {
            setValue(learner_select.name);
        }
    }, [learner_select]);

    const ChangeValue = useCallback((text, index) => {
        setValue(text);
        setIndex(index);
    }, []);

    const ClickSelect = useCallback(() => {
        if (index > 0) {
            let select = {
                name: value,
                index: index -1
            }
            dispatch(setLearnerSelect(select));
            RNSecureKeyStore.set("ddangkongLearner", select.index + '', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                .then((res) => {
                    props.navigation.replace('PlayList');
                }, (err) => {
                    console.log(err);
                });
        } else {
            MyAlert(t('learner.select.null'));
        }
    }, [value, index]);

   const ClickLearnerAdd = useCallback(() => {
       if (learner.length < 8) {
           props.navigation.push('LearnerInsert', {type: 'learner'});
       } else {
           MyAlert(t('learner.select.full'));
       }
    }, [learner]);

  return (
      <>
          <View style={styles.container}>
              <View style={styles.selectBox}>
                  <MySelectBox placeholder={t('learner.select.placeholder')}
                               items={learner}
                               value={value}
                               onValueChange={(text, index) => ChangeValue(text, index)} />
                  <TouchableOpacity activeOpacity={1}
                                    style={styles.plusBox}
                                    onPress={() => ClickLearnerAdd()}>
                      <MyImg src={require('~/assets/images/plus_icon.png')}
                             style={styles.plusImg}/>
                             <MyText text={t('learner.select.plus')} />
                  </TouchableOpacity>
              </View>
              <View style={Style.btnBox}>
                  <MyButton text={t('learner.select.click')}
                            type={'primary'}
                            style={Style.btnMd}
                            onPress={() => ClickSelect()} />
              </View>
          </View>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        width: t('boxWidth'),
    },
    selectBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    plusBox: {
        alignItems: 'center',
        marginLeft: 10
    },
    plusImg: {
        width: 13,
        height: 13,
        marginBottom: 5
    },
});

export default memo(LearnerSelect);
