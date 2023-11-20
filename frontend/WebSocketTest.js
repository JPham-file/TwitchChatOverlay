import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WebSocketTest = () => {
    useEffect(() => {
        // Create a new WebSocket connection
        const socket = new WebSocket("ws://localhost:8080/ws/chat");

        // Connection opened
        socket.addEventListener('open', (event) => {
            console.log('Connected to the WebSocket server');
        });

        // Listen for messages
        socket.addEventListener('message', (event) => {
            console.log('Message from server', event.data);
        });

        // Listen for possible errors
        socket.addEventListener('error', (error) => {
            console.error('WebSocket Error', error);
        });

        // Clean up the socket when component unmounts
        return () => socket.close();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Check your console for WebSocket messages</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WebSocketTest;
