import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import config from './config';

import renderMessage from "./renderMessage";

const MAX_MESSAGES = 20;
const getRandomColor = () => {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;

    return 'purple'
};

const WebSocketTest = () => {
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef()

    useEffect(() => {
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
            {/*<Text style={styles.messageText}>{item}</Text>*/}
            {renderMessage(item, getRandomColor)}
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
        borderBottomColor: '#000000',
        marginVertical: 1,
    },
    messageText: {
        color: 'white'
    }
});

export default WebSocketTest;
