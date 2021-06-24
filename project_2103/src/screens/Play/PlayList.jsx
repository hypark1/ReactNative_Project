import React, {memo, useState, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import Config from 'react-native-config';
import moment from "moment";
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import DateFormat from "~/modules/DateFormat";
import MyImg from '~/component/MyImg';
import MyText from '~/component/MyText';
import PlayListBtn from "~/screens/Play/PlayListBtn";
import Style from '~/styles/Style';
import Colors from '~/styles/Colors';

const { t } = I18n;

const PlayList = (props) => {
    const { list } = props;
    const [clock, setClock] = useState(false);
    const learner = useSelector((store) => store.reducer.learner);
    const learner_info = useSelector((store) => store.reducer.learner_info);
    const learner_select = useSelector((store) => store.reducer.learner_select);
    const class_interval = useSelector((store) => store.reducer.class_interval);
    const interval = useRef();

    useEffect(() => {
        if (learner.length > 0) {
            BoolClassOpen();
            /*인터벌에 값 없을때만*/
            interval.current = setInterval(() => {
                BoolClassOpen();
            }, 1000);
            return () => {
                clearInterval(interval.current);
            }
        }
    }, [list]);

    useEffect(() => {
        if (!class_interval) {
            clearInterval(interval.current);
        }
    }, [class_interval]);

    useEffect(() => {
        if (clock) {
            /*시작중*/
            clearInterval(interval.current);
        }
    }, [clock]);

    const BoolClassOpen = useCallback(() => {
        let today = new Date();
        let time = moment(list.classStartDate).subtract(5,'minutes')
        let result = moment(time).isSameOrBefore(today);
        setClock(result);
    }, [list]);

    /*학생 수업 참여 링크 가져오기*/
    const PostStudentInfo = useCallback(() => {
        let learnerInfo = learner[learner_select.index]
        let data = {
            accountId: learnerInfo.learner_id,
            birthday: learnerInfo.birthday,
            classKey: list.classKey,
            classStartDate: list.classStartDate,
            gender: learnerInfo.gender,
            loginId: learner_info.login_id,
            userName: learnerInfo.learner_name
        }
        Http({
            method: 'POST',
            url: '/api/student/getStudentInfo',
            data: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    props.navigation.navigate('PlayVideo', {playUrl: resData.data})
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [list, learner, learner_select, learner_info]);

  return (
      <>
          {
              !clock?
                  /*입장전*/
                  <View style={styles.notiBox}>
                      <MyText text={t('play.start.0')} />
                      <MyText text={t('play.start.1')}
                              color={'red'}
                              family={'NanumB'} />
                      <MyText text={t('play.start.2')} />
                      <View style={Style.dot} />
                  </View>
                  :
                  null
          }
          <View style={styles.contentsBox}>
              <View style={styles.thumbBox}>
                  <MyImg src={{uri: Config.IMG_URL + list.classImagePath}}
                         style={styles.thumb}
                         resizeMode={'cover'}/>
              </View>
              <View style={{flex: 1}} />
              <View style={styles.textBox}>
                  <View>
                      <MyText text={list.courseTitle}
                              family={'GodoM'}
                              size={'md'}
                              color={'brown'}
                              style={styles.textTitle} />
                      <View style={styles.classBox}>
                          {/*<View style={styles.classText}>
                              <MyText text={t('play.classTimes', { num: 20 })}
                                      family={'GodoB'}
                                      color={'white'} />
                          </View>*/}
                          <MyText text={list.classTitle}
                                  family={'NanumB'}
                                  size={'sm'} />
                      </View>
                      <MyText text={list.classIntroduction}
                              line={3} lineHeight={17}/>
                      <View style={styles.timeBox}>
                          <MyImg src={require('~/assets/images/play/time_icon.png')}
                                 style={styles.timeIcon}/>
                            <View style={{flexDirection: 'row'}}>
                                <MyText text={DateFormat(list.classStartDate).yymmdd}
                                        family={'NanumB'}
                                        size={'sm'} />
                                <MyText text={DateFormat(list.classStartDate).hh}
                                        family={'NanumB'}
                                        size={'sm'}
                                        color={'time'} />
                                <MyText text={t('play.time.start')}
                                        family={'NanumB'}
                                        size={'sm'} />
                            </View>
                      </View>
                  </View>
              </View>
          </View>
          <PlayListBtn clock={clock}
                       navigation={props.navigation}
                       PostStudentInfo={PostStudentInfo} />
      </>
  );
};

const styles = StyleSheet.create({
    notiBox: {
        flexDirection: 'row',
        marginTop: -40,
        marginBottom: 20
    },
    contentsBox: {
        flexDirection: 'row',
    },
    thumbBox: {
        flex: 8,
        borderWidth: 1,
        borderColor: Colors.line,
        borderRadius: 12,
        backgroundColor: Colors.white,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: Colors.white,
                shadowOffset: {width: 1, height: 2,},
                shadowOpacity: 0.23, shadowRadius: 4,
            },
            android: {
                elevation: 2
            }
        })
    },
    thumb: {
        width: '100%',
        paddingBottom: '65%'
    },
    textTitle: {
        marginBottom: 7
    },
    textBox: {
        flex: 10,
        justifyContent: 'center',
    },
    classBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7
    },
    classText: {
        padding: 5,
        backgroundColor: Colors.green,
        borderRadius: 3,
        marginRight: 5,
    },
    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    timeIcon: {
        width: 30,
        height: 30,
        marginRight: 5
    }
});

export default memo(PlayList);
