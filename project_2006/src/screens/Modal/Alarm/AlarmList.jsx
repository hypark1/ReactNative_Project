import React, { memo } from 'react';
import { FlatList, View, StyleSheet, Linking } from 'react-native';
import I18n from "~/locales/I18n";
import MyImgButton from "~/component/MyImgButton";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

const arr = [
    {
        content: '김가온 학생이 새로 획득한 청크카드를 확인해보세요.\n\n* 학습한 청크: I am new here.',
        sns: 'blog',
        date: '2020-04-30 22:30',
        url: 'https://www.facebook.com/hodooenglish/'
    },
    {
        content: '디노가 김가온 학생에게 곧 다가올 생일 선물에 대해 궁금한 것이 있대요.\n\n * 설문에 참여하시면 게임 내에서 디노와 즐거운 대화를 나눌 수 있어요. 2013-05-29 생일이 되기 전 날까지 참여해주세요.',
        sns: null,
        date: '2020-04-30 22:30',
        url: 'https://www.facebook.com/hodooenglish/'
    },
    {
        content: '김가온 학생이 호두잉글리시를 시작했어요! 아이의 학습을 격려해 주세요.\n\n * 이 메시지는 아이가 학습을 시작한 시점에 하루 한 번 발송됩니다.',
        sns: 'youtube',
        date: '2020-04-30 22:30',
        url: 'https://www.facebook.com/hodooenglish/'
    },
    {
        content: '가정의 달을 맞이하여, 5월 출석 이벤트를 시작합니다.\n\n* 참여방법: 5월 한 달 동안 20일 이상 출석한 경우, 학습 리포트 스샷을 찍어 호두공식홈페이지 > 리얼후기에 올려주세요.\n\n* 특별혜택: 참여하는 모든 분께 학습자 계정에 미오 붕어빵을 100개씩 드립니다. 꼭 참여해서 꾸준히 호두 습관 이어가세요~\n',
        sns: 'youtube',
        date: '2020-04-30 22:30',
        url: 'https://www.facebook.com/hodooenglish/'
    },
];

const AlarmList = (props) => {
    return (
        <>
            {
                arr.length === 0?
                <MyText text={t('alarm.null')}
                        style={styles.alarmNull}
                        size={'md'}
                        weight={'5'}
                        align={'center'} />
                :
                <FlatList
                    keyExtractor={item => item.content}
                    data={arr}
                    windowSize={2}
                    renderItem={({item}) =>
                        <View style={styles.listBox}>
                            <MyText text={item.content}
                                    size={'md'}
                                    weight={'5'}
                                    style={styles.listContent} />
                            <View style={styles.listBot}>
                                <MyText text={item.date} />
                                <MyImgButton src={require('~/assets/images/menu_sns_facebook.png')}
                                             onPress={() => Linking.openURL(item.url)}
                                             style={styles.listSns}  />
                            </View>
                        </View>
                    }
                />
            }
        </>
    );
};

const styles = StyleSheet.create({
    alarmNull: {
        margin: 30
    },
    listBox: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.line,
        padding: 20
    },
    listContent: {
        lineHeight: 23
    },
    listBot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    listSns: {
        width: 15,
        height: 15
    }
});

export default memo(AlarmList);
