import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';

import ChatContainer from "./ChatContainer";
import WebSocketTest from "./WebSocketTest";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Open up App.js to start working on your app!</Text>

            <SafeAreaView>
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
});
