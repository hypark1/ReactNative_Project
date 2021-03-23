import React, { memo, useState, useCallback } from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, RefreshControl} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*완료한 챌린지 리스트*/
const MissionDoneList = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    /*새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.refresh();
        setTimeout(() => {
            setRefreshing(false);
        }, 700);
    }, []);

    /*완료된 챌린지 클릭시*/
    const ClickList = useCallback((index) => {
        props.open(index);
    }, []);

    return (
        <>
            <FlatList keyExtractor = { (item, index) => index.toString() }
                  data={props.value}
                  windowSize={4}
                  refreshControl={
                      <RefreshControl refreshing={refreshing}
                                      onRefresh={onRefresh} />
                  }
                  renderItem={({item, index}) =>
                      <TouchableOpacity activeOpacity={1}
                                        onPress={ClickList.bind(this, index)}>
                          <View style={[styles.listBox, { backgroundColor: item.read_flag === 'n' ? Colors.beige : Colors.white}]}>
                              <View style={styles.listIcon}>
                                  <MyImg src={require('~/assets/images/mission_gift.png')}
                                         style={styles.iconImg}
                                         resizeMode={'contain'} />
                                  {
                                      item.read_flag === 'n' ?
                                          /*읽지 않았을때*/
                                          <MyImg src={require('~/assets/images/mission_list_new.png')}
                                                 style={styles.newIconImg}
                                                 resizeMode={'contain'} />
                                            :
                                          null
                                  }
                              </View>
                              <View style={styles.titleBox}>
                                  <MyText text={t('mission.going.result', { time: (item.target_study_time)/60, date: item.target_count})}
                                          size={'md'}
                                          weight={'5'}
                                          line={2}
                                          style={styles.title}/>
                                  <MyText text={item.start_date + ' ~ ' + item.end_date}
                                          en={true}/>
                              </View>
                              <View style={styles.arrowBox}>
                                  <MyImg src={require('~/assets/images/mission_list_arrow.png')}
                                         style={styles.arrowImg}
                                         resizeMode={'contain'} />
                              </View>
                          </View>
                      </TouchableOpacity>
                  }
            />
        </>
    );
};

const styles = StyleSheet.create({
    listBox: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: Colors.line
    },
    listIcon: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        width: '100%',
        height: 80
    },
    newIconImg: {
        position: 'absolute',
        left: -10,
        top: -10,
        width: 45,
        height: 45
    },
    titleBox: {
        flex: 5,
        marginLeft: 20,
        justifyContent: 'center'
    },
    title: {
        marginVertical: 7,
        lineHeight: 23
    },
    arrowBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    arrowImg: {
        width: 15,
        height: 15
    }
});

export default memo(MissionDoneList);
