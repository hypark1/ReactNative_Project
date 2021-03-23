import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import MyImg from "~/component/MyImg";
import ReviewTitle from "~/screens/Review/ReviewTitle";
import ReviewContents from "~/screens/Review/ReviewContents";
import AnnounceTitle from "~/screens/Announce/AnnounceTitle";
import AnnounceContents from "~/screens/Announce/AnnounceContents";
import Colors from "~/styles/Colors";

/*공지, 리얼후기 리스트 dom*/
const MyListDom = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={styles.listTopBox}
                              onPress={props.toggleList.bind(this, props.index)}>
                <View style={styles.textBox}>
                    {
                        props.type === 'announce' ?
                            <AnnounceTitle data={props.item} />
                            :
                            <ReviewTitle data={props.item} />
                    }
                </View>
                <View style={styles.arrowBox}>
                    {
                        props.index === props.visible?
                            <MyImg src={require('~/assets/images/list_arrow_up.png')}
                                   style={[styles.arrowImg]}/>
                            :
                            <MyImg src={require('~/assets/images/list_arrow_down.png')}
                                   style={[styles.arrowImg]}/>
                    }
                </View>
            </TouchableOpacity>
            <View style={{ height: props.index === props.visible? null : 0, overflow:'hidden' }}>
                {
                    props.type === 'announce' ?
                        <AnnounceContents data={props.item} />
                        :
                        <ReviewContents data={props.item} index={props.index} visible={props.index === props.visible} />
                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    listTopBox: {
        backgroundColor: Colors.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.line,
        flexDirection: 'row'
    },
    textBox: {
        flex: 15,
        paddingRight: 20
    },
    arrowBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowImg: {
        width: 13,
        height: 13
    },
});

export default memo(MyListDom);
