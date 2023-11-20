import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';


const ChatContainer = () => {
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();
    let socket;


    useEffect(() => {
        // Establish WebSocket connection
        socket = new WebSocket("ws://localhost:8080/ws/chat");

        socket.onopen = () => console.log("Connected to the WebSocket");
        socket.onerror = (error) => console.log(`WebSocket Error: ${error}`);

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Auto-scroll to the bottom
            scrollViewRef.current.scrollToEnd({ animated: true });
        };

        return () => {
            // Clean up the socket connection
            socket.close();
        };
    }, []);

    return (
        <ScrollView
            style={styles.chatContainer}
            ref={scrollViewRef}
        >
            {messages.map((message, index) => (
                <View key={index} style={styles.message}>
                    <Text style={styles.userName}>{message.userName}</Text>
                    <Text style={styles.chatMessage}> {message.userChatMessage}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        width: 400,
        height: 600,
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 10,
        overflow: 'scroll',
    },
    userName: {
        fontWeight: 'bold',
    },
    chatMessage: {
        wordWrap: 'break-word',
        color: '#ffffff',
        fontSize: 18,
    },
    message: {
        padding: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
});

export default ChatContainer;