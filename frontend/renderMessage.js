import React from 'react';
import { StyleSheet, Text, View, Image } from "react-native";
import emotes from './emote';

const renderMessage = (message, getColor) => {
    const messageComponents = [];
    const words = message.split(' ');
    let isFirstWord = true;
    const firstWordColor = getColor();

    words.forEach((word, index) => {
        if (emotes[word]) {
            if (isFirstWord) {
                // If it's the first word and an emote, reset the flag
                isFirstWord = false;
            }
            messageComponents.push(
                <Image
                    key={`emote-${index}`}
                    source={emotes[word]}
                    style={styles.emoteStyle}
                    resizeMode="contain"
                />
            );

            // Add a space after the emote
            messageComponents.push(
                <Text key={`space-${index}`}>
                    {' '}
                </Text>
            );

        } else {
            const wordStyle = isFirstWord
                ? { ...styles.firstWordText, color: firstWordColor }
                : styles.messageText;

            messageComponents.push(
                <Text key={`text-${index}`} style={wordStyle}>
                    {word + ' '}
                </Text>
            );

            // Reset the flag after the first word
            isFirstWord = false;
        }
    });

    return <View style={styles.messageContainer}>{messageComponents}</View>;
};

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    messageText: {
        fontSize: 16,
        color: 'white',
    },
    firstWordText: {
        fontSize: 16,
        fontWeight: 'bold',
        // color is set dynamically
    },
    emoteStyle: {
        width: 35,
        height: 35,
    },
});

export default renderMessage;