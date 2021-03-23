import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from "~/component/MyText";
import ReviewLike from "~/screens/Review/ReviewLike";
import ReviewFiles from "~/screens/Review/ReviewFiles";
import Colors from "~/styles/Colors";

const ReviewContents = (props) => {
    const { data } = props;

    return (
        <>
            <View style={styles.listBotBox} >
                <View>
                    <View>
                        <ReviewFiles data={data}
                                     visible={props.visible}/>
                    </View>
                    <MyText text={data.text}
                            size={'xm'}
                            style={styles.contentsText} />
                </View>
                <ReviewLike data={data}
                            index={props.index} />
            </View>

        </>
    )
};

const styles = StyleSheet.create({
    listBotBox: {
        backgroundColor: Colors.background,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.line,
    },
    contentsText: {
        marginTop: 15,
        lineHeight: 25
    },
});

export default memo(ReviewContents);
