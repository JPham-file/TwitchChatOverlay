import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import config from './config';

const MAX_MESSAGES = 150;

const WebSocketTest = () => {
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef()

    useEffect(() => {
        // const socket = new WebSocket("ws://localhost:8080/ws/chat");
        const socket = new WebSocket(config.WEBSOCKET_URL);

        socket.addEventListener('open', (event) => {
            console.log('Connected to the WebSocket server');
        });

        socket.addEventListener('message', (event) => {
            setMessages(prevMessages => {
                // Keep only the last MAX_MESSAGES messages
                const updatedMessages = [...prevMessages, event.data];
                if (updatedMessages.length > MAX_MESSAGES) {
                    return updatedMessages.slice(updatedMessages.length - MAX_MESSAGES);
                }
                return updatedMessages;
            });
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket Error', error);
        });

        return () => socket.close();
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.message}>
            <Text>{item}</Text>
        </View>
    );

    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    message: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 5,
    },
});

export default WebSocketTest;
