import React from 'react';
import WebView from "react-native-webview";
import {View, StyleSheet} from 'react-native';
import ScrollViewWithEventThrottle
    from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedScrollView";

const Stream = ({channelName}) => {
    const twitchURL = `https://player.twitch.tv/?channel=${channelName}&parent=yourappdomain.com`;
    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                source={{uri: twitchURL}}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    }
});

export default Stream;