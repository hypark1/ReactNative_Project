import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Platform} from 'react-native';
import * as RNIap from 'react-native-iap'
import VersionCheck from "react-native-version-check";
import {useDispatch, useSelector} from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import MyTitle from '~/component/MyTitle';
import MyButton from "~/component/MyButton";
import MySetting from "~/component/MySetting";
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import MyBack from "~/component/MyBack";
import LoadPopup from "../LoadPopup";
import Style from '~/styles/Style';

const { t } = I18n;

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const StoreName = Platform.OS === 'android'? 'PLAY_STORE' : 'APP_STORE';

const PurchaseScreen = (props) => {
    const [list, setList] = useState(null);
    const learner = useSelector((store) => store.reducer.learner);
    const learner_info = useSelector((store) => store.reducer.learner_info);
    const learner_select = useSelector((store) => store.reducer.learner_select);
    const dispatch = useDispatch();

    useEffect(() => {
        setList(null);
        StartPurchase();
        return () => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
                purchaseUpdateSubscription = null;
            }
            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
                purchaseErrorSubscription = null;
            }
            RNIap.endConnection();
        }
    }, []);

    const StartPurchase = async () => {
        try {
            /*IAP 모듈을 초기화*/
            const result = await RNIap.initConnection();
            /*이미 실패했지만 Play 스토어 캐시에서 여전히 보류 중으로 표시된 보류중인 결제*/
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            console.log('result', result);
            PostProductionsList();
        } catch (err) {
            console.warn(err.code, err.message);
        }

        /*상점에 아직 완료, 소비 또는 승인되지 않은 구매에 대한 업데이트가있을 때 호출*/
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            async (purchase: RNIap.InAppPurchase | RNIap.SubscriptionPurchase) => {
                /*구매 개체*/
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                    try {
                        /*if (Platform.OS === 'ios') {
                            finishTransactionIOS(purchase.transactionId);
                        } else if (Platform.OS === 'android') {
                            // If consumable (can be purchased again)
                            consumePurchaseAndroid(purchase.purchaseToken);
                            // If not consumable
                            acknowledgePurchaseAndroid(purchase.purchaseToken);
                        }*/
                        const ackResult = await RNIap.finishTransaction(purchase);
                        console.log('ackResult', ackResult);
                    } catch (ackErr) {
                        console.warn('ackErr', ackErr);
                    }

                    console.log('Receipt', receipt);
                }
            },
        );

        /*구매에 오류가있을 때 호출되는 콜백*/
        purchaseErrorSubscription = RNIap.purchaseErrorListener(
            (error: RNIap.PurchaseError) => {
                console.log('purchaseErrorListener', error);
                //Alert.alert('purchase error', JSON.stringify(error));
            },
        );
    }

    /*제품 목록 가져오기*/
    const getItems = async (value) => {
        const itemSkus = Platform.select({
            ios: [ value.inAppProductKey ],
            android: [ value.inAppProductKey ]
        });
        try {
            const products = await RNIap.getProducts(itemSkus);
            // const products = await RNIap.getSubscriptions(itemSkus);
            console.log('Products', products);
            //MyAlert('구입 항목 리스트 : ' + JSON.stringify(products));
            //setList(products)
        } catch (err) {
            console.log(err.code, err.message);
        }
    }

    /*제품 목록 가져오기*/
    const PostProductionsList = useCallback(() => {
        let version = VersionCheck.getCurrentVersion();
        let data = {
            appVersion: version.trim(),
            storeId: StoreName
        }
        console.log(data)
        Http({
            method: 'POST',
            data: data,
            url: '/InApp/InAppProductList'
        })
            .then(response => {
                if (response.request.status === 200) {
                    console.log('PostLearnerAdd')
                    console.log(response.request._response)
                    let result = JSON.parse(response.request._response);
                    setList(result[0]);
                    getItems(result[0]);
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    /*구매 한 모든 항목 가져오기*/
    const getAvailablePurchases = async () => {
        try {
            console.log(
                'Get available purchases (non-consumable or unconsumed consumable)',
            );
            const purchases = await RNIap.getAvailablePurchases();
            console.log('Available purchases :: ', purchases);
            if (purchases && purchases.length > 0) {
                console.log(`Got ${purchases.length} items.`)
                console.log(purchases[0].transactionReceipt)
            }
        } catch (err) {
            console.log(err.code, err.message);
            //Alert.alert(err.message);
        }
    };

    /*항목 구매하기*/
    const requestPurchase = async () => {
        dispatch(setLoad(true));
        try {
            const result = await RNIap.requestPurchase(list.inAppProductKey, false);
            console.log('result', result);
            validationReceipt(result.transactionReceipt);
        } catch (err) {
            console.warn(err.code, err.message);
            dispatch(setLoad(false));
        }
    }

    /*영수증 검증 코드*/
    const validationReceipt = async (value) => {
       const receiptBody = {
            'receipt-data': value,
            'password': '290d68d2d6204415a5277e449d040083'
        };
        let result = await RNIap.validateReceiptIos(receiptBody, false);
        console.log('validateReceiptIos', result);
        console.log('구매 완료!!!!!!!!');
        if(result.status === 21007) {
            result = await RNIap.validateReceiptIos(receiptBody, true);
            console.log('valid receipt was 21007');
            console.log(result);
            PostPurchaseComplete(result);
        } else {
            PostPurchaseComplete(result);
        }
    }

    /*구매 완료*/
    const PostPurchaseComplete = useCallback((value) => {
        let data = {
            amount: list.sellingPrice,
            inAppProductKey: value.receipt.in_app[0].product_id,
            learnerId: learner[learner_select.index].learner_id,
            orderDate: value.receipt.in_app[0].purchase_date.slice(0, 10),
            parentAccountId: learner_info.account_id,
            storeId: StoreName,
            transactionKey: value.receipt.in_app[0].transaction_id,
        }
        //MyAlert('PostPurchaseComplete' + JSON.stringify(data))
        Http({
            method: 'POST',
            data: data,
            url: '/InApp/completeInAppOrder'
        })
            .then(response => {
                dispatch(setLoad(false));
                //MyAlert('PostLearnerAdd', JSON.stringify(response))
                if (response.request.status === 200) {
                    props.navigation.replace('PlayList');
                }
            })
            .catch(error => {
                //MyAlert('error', JSON.stringify(error))
                dispatch(setLoad(false));
                ErrorSet(error);
            })
    }, [list, learner, learner_info, learner_select]);

    /*최신 영수증 가져오기*/
    const getNewReceipt = async () => {
        const newReceipt = await RNIap.getReceiptIOS();
        console.log('newReceipt', newReceipt);
        validationReceipt(newReceipt);
    }

  return (
      <>
          <LoadPopup />
          <SafeAreaView style={[Style.SafeAreaView]}>
              <StatusBar hidden={true} />
              <View style={Style.headerWrap}>
                  <MyBack navigation={props.navigation} />
                  <MySetting navigation={props.navigation} />
                  <View style={Style.ScreenWrap}>
                          <MyTitle title={t('purchase.title')}
                                   subColor={'brown'} />
                      <View style={styles.noticeBox}>
                          <MyImg src={require('~/assets/images/notice_icon.png')}
                                 style={styles.icon}/>
                          <MyText text={t('purchase.sub')} />
                      </View>
                      <View style={{ width: '80%'}}>
                          {
                              list ?
                                  <>
                                      <View style={styles.listBox}>
                                          <MyText text={list.inAppProductName}
                                                  en={true}
                                                  size={'sm'} />
                                          <MyText text={'₩' + list.sellingPrice}
                                                  size={'sm'} />
                                      </View>
                                  </>
                                  :
                                  null
                          }
                      </View>
                      <View style={Style.btnBox}>
                          <MyButton text={t('purchase.btn')}
                                    type={'primary'}
                                    style={Style.btnSm}
                                    onPress={() => requestPurchase()} />
                      </View>
                  </View>
              </View>
          </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
    noticeBox: {
        flexDirection: 'row',
        marginTop: -10,
        marginBottom: 35
    },
    icon: {
        width: 13,
        height: 13,
        marginRight: 5
    },
    listBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between'
    }
});

export default PurchaseScreen;
