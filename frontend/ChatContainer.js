import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import config from './config';

import renderMessage from "./renderMessage";

const MAX_MESSAGES = 100;
const UPDATE_MESSAGES = 250;  // ms
const getRandomColor = () => {
    return 'orange'
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
};

const renderItem = ({item}, getRandomColorFn) => (
    <View style={styles.message}>
        {renderMessage(item, getRandomColorFn)}
    </View>
);

const ChatContainer2 = () => {
    const [message, setMessage] = useState([]);
    const flatListRef = useRef();

    useEffect(() => {
        const messageBatch = [];
        const socket = new WebSocket(config.WEBSOCKET_URL);

        socket.onmessage = (event) => {
            messageBatch.push(event.data);
        };

        const interval = setInterval(() => {
            if (messageBatch.length > 0) {
                setMessage(prevMessage => {
                    const updatedMessages = [...prevMessage, ...messageBatch];
                    return updatedMessages.slice(-MAX_MESSAGES);
                });
            }
        }, UPDATE_MESSAGES); // update every ms

        return () => {
            clearInterval(interval);
            socket.close();
        };
    }, []);

    // const renderItem = ({item}) => (
    //     <View style={styles.message}>
    //         {renderMessage(item, getRandomColor)}
    //     </View>
    // );

    const memoizedRenderItem = useCallback(
        ({ item }) => renderItem({ item }, getRandomColor),
        [] // Dependencies array, empty means the callback does not change
    );

    return (
        <FlatList
            ref={flatListRef}
            data={message}
            renderItem={memoizedRenderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
        />
    );
}

const ChatContainer = () => {
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
        padding: 20,
    },
    message: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginVertical: 1,
    },
    messageText: {
        color: 'white'
    }
});

export default ChatContainer2;
