import React from 'react';
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';
import Colors from "~/styles/Colors";

class MinischoolView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const playUrl = this.props.route.params.playUrl;
    //const playUrl =
    //  'https://dev-player.minischool.co.kr/tvclient/rcPAuum9ay07Va5FqRSl9c810f36d48f43898fecd2f6777086db?lang=ko&furl=https%3A%2F%2Fhodooenglish.com%2Fddangkong';
    return (
        <View style={{flex: 1, backgroundColor: Colors.black}}>
            <Minischool
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                url={playUrl}
                onBackPress={() => {
                    this.props.navigation.pop(2);
                }}
            />
        </View>
    );
  }
}

MinischoolView.propTypes = {
  ...View.propTypes,
  onBackPress: PropTypes.func,
};

const Minischool = requireNativeComponent('MinischoolView', MinischoolView, {
  nativeOnly: {onChange: true},
});

module.exports = MinischoolView;
