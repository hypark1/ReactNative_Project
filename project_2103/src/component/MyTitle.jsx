import React, { memo } from 'react';
import {StyleSheet} from 'react-native';
import MyText from '~/component/MyText';

/*기본 타이틀*/
const MyTitle = (props) => {
    return (
        <>
            <MyText text={props.title}
                    color={'brown'}
                    family={'GodoB'}
                    size={'xl'}
                    style={styles.title}
                    align={'center'}
                    lineHeight={38} />
            <MyText text={props.sub}
                    color={props.subColor}
                    style={styles.sub}
                    align={'center'} />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 15,
        marginBottom: 15
    },
    sub: {
        marginBottom: 15,
        lineHeight: 18
    }
});

export default memo(MyTitle);
