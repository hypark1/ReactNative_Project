import React, { memo } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import LinkingSet from "~/modules/LinkingSet";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";

/*공지사항 내용*/
const AnnounceContents = (props) => {
    return (
        <>
            <View style={styles.listBotBox} >
                <HTML html={props.data.text.replace(/<br ?\/?>/g, "")}
                      imagesMaxWidth={Dimensions.get('window').width -40}
                      ignoreStyles = {[ 'font-family', 'display', 'text-align',]}
                      allowedStyles = {[ 'none', 'flex']}
                      onLinkPress={ (evt, href) => {
                          LinkingSet(href)
                      }}
                      tagsStyles={{ p: { marginTop: 0, marginBottom: 0, lineHeight: 22 }}}
                      baseFontStyle={{ fontSize: Fonts.size['sm'], fontFamily: Fonts.weight['5'], color: Colors.text }} />
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
});

export default memo(AnnounceContents);
