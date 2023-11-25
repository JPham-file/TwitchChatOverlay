import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';

import Stream from './Stream';
import ChatContainer from "./ChatContainer";
import WebSocketTest from "./WebSocketTest";

const {height} = Dimensions.get('window');

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <SafeAreaView style={styles.safeArea}>
                <Stream channelName={''} style={styles.stream}/>
                <WebSocketTest/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        width: '100%',
    },
    stream: {
        height: height * 0.3, // take half the screen
        width: '100%',
    },
});
