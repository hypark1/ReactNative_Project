import React, {memo, useCallback} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet, Linking, Platform} from "react-native";
import CameraRoll from '@react-native-community/cameraroll'
import RNKakaoLink from 'react-native-kakao-links'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import {ShareDialog} from "react-native-fbsdk";
import Clipboard from "@react-native-community/clipboard";
import I18n from "~/locales/I18n";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import MyAlert from "~/component/MyAlert";

const { t } = I18n;

const chunkList = [
    { id: 0, title: t('share.kakao'), img: require('~/assets/images/share_kakao.png') },
    { id: 1, title: t('share.instagram'), img: require('~/assets/images/share_instagram.png') },
    { id: 2, title: t('share.facebook'), img: require('~/assets/images/share_facebook.png') },
    { id: 3, title: t('share.link'), img: require('~/assets/images/share_link.png') },
]

const linkList = [
    { id: 0, title: t('share.kakao'), img: require('~/assets/images/share_kakao.png') },
    { id: 2, title: t('share.facebook'), img: require('~/assets/images/share_facebook.png') },
    { id: 3, title: t('share.link'), img: require('~/assets/images/share_link.png') },
]

/*공유하기*/
const MyShare = (props) => {
    const kakao = useCallback(() => {
        const linkObject={
            webURL                : props.copyLink,//optional
            mobileWebURL          : props.copyLink,//optional
            // androidExecutionParams:'shopId=1&itemId=24', //optional For Linking URL
            // iosExecutionParams    :'shopId=1&itemId=24', //optional For Linking URL
        };
        const contentObject = {
            title     : props.title,
            link      : linkObject,
            imageURL  : props.linkImg,
            //desc      : '설명',//optional
            imageWidth: props.width,//optional
            imageHeight: props.height//optional
        }
        const buttonObject = {
            title: props.btn,//required
            link : linkObject,//required
        }
        try {
            const options = {
                objectType:'feed',//required
                content:contentObject,//required
                //social:socialObject,//optional
                buttons:[buttonObject]//optional
            };
            RNKakaoLink.link(options);
        } catch (e) {
            console.warn(e);
        }
    }, [props]);

    const instagram = useCallback(async () => {
        if (Platform.OS === 'android') {
            RNFetchBlob
                .config({
                    fileCache : true,
                    // by adding this option, the temp files will have a file extension
                    appendExt : 'jpg'
                })
                .fetch('GET', props.linkImg, {
                    //some headers ..
                })
                .then((res) => {
                    Share.shareSingle({
                        url: `file://` + res.path(),
                        social: Share.Social.INSTAGRAM,
                    });
                })
        } else {
            let filePath = null;
            RNFetchBlob
                .config({
                    fileCache : true,
                    // by adding this option, the temp files will have a file extension
                    appendExt : 'jpg'
                })
                .fetch('GET', props.linkImg, {
                    //some headers ..
                })
                .then((res) => {
                    filePath = res.path();
                    return res.readFile('base64');
                })
                .then(async base64Data => {
                    let base64 = `data:image/jpg;base64,` + base64Data;
                    await CameraRoll.save(base64, 'photo');
                    let instagramURL = `instagram://library?AssetPath=null`;
                    Linking.openURL(instagramURL);
                });
        }
    }, [props.linkImg]);

    const facebook = useCallback(() => {
        let shareLinkContent = {
            contentType: 'link',
            contentUrl: props.copyLink
        }
        ShareDialog.canShow(shareLinkContent).then(
            (canShow) => {
                if (canShow) {
                    return ShareDialog.show(shareLinkContent);
                }
            }
        ).then(
            (result) => {
                console.log('shareLinkWithShareDialog')
                console.log(result)
                /*if (result.isCancelled) {
                    console.log('Share operation was cancelled');
                } else {
                    console.log('Share was successful with postId: '
                        + result.postId);
                }*/
            },
            (error) => {
                console.log('Share failed with error: ' + error.message);
            }
        );
    }, [props.copyLink]);

    const CopyUrl = useCallback(() => {
        Clipboard.setString(props.copyLink);
        MyAlert(t('share.copyText'));
    }, [props.copyLink]);

    const ClickShare = useCallback(async (value) => {
        if (value === 0) {
            // 카카오톡
            if (props.type === 'chunk') {
                AnalyticsSet('click', 'Chunk_Detail_Share_Kakao_Click');
            }
            kakao();
        } else if (value === 1) {
            // 인스타그램
            if (props.type === 'chunk') {
                AnalyticsSet('click', 'Chunk_Detail_Share_Instagram_Click');
            }
            instagram();
        } else if (value === 2) {
            // 페이스북
            if (props.type === 'chunk') {
                AnalyticsSet('click', 'Chunk_Detail_Share_Facebook_Click');
            }
            facebook();
        } else if (value === 3) {
            // 주소 복사
            if (props.type === 'chunk') {
                AnalyticsSet('click', 'Chunk_Detail_Share_Address_Click');
            }
            CopyUrl();
        }
    }, [props.type]);

    return (
        <>
            <View style={styles.container}>
                <FlatList keyExtractor = { (item, index) => index.toString() }
                          data={props.type === 'chunk' ? chunkList : linkList}
                          numColumns={props.type === 'chunk' ? 2 : 3}
                          windowSize={4}
                          renderItem={({item}) =>
                              <>
                                  <TouchableOpacity activeOpacity={1}
                                                    onPress={ClickShare.bind(this, item.id)}
                                                    style={styles.listBox}>
                                      <MyImg src={item.img}
                                             style={styles.iconBox}/>
                                             <MyText text={item.title}
                                                     style={styles.iconText} />
                                  </TouchableOpacity>
                              </>
                          }
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    listBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    iconBox: {
        width: 70,
        height: 70,
        marginTop: 10
    },
    iconText: {
        marginTop: 10,
        marginBottom: 25
    }
})

export default memo(MyShare);
