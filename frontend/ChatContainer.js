import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';


const ChatContainer = () => {

    useEffect(() => {

        const socket = new WebSocket("ws://localhost:8080/ws/chat");

        // open connection
        socket.addEventListener('open', event => {
            console.log('Connected to WebSocket server');
        });

        // listen for message
        socket.addEventListener('message', event => {
            console.log('Message From Server', event.data);
        });

        // listen for erros
        socket.addEventListener('error', error => {
            console.error('WebSocket Error', error);
        });

        return () => socket.close();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Open Console for Log messages</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 5,
    },
});

export default ChatContainer;