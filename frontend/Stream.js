import React from 'react';
import WebView from "react-native-webview";
import {View, StyleSheet} from 'react-native';

const Stream = ({channelName, style}) => {
    const twitchURL = `https://player.twitch.tv/?channel=${channelName}&parent=yourappdomain.com`;
    return (
        <View style={style}>
            <WebView
                // style={StyleSheet.absoluteFill}
                source={{uri: twitchURL}}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
            />
        </View>
    );
};
export default Stream;