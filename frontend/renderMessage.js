import {StyleSheet, Text, View} from "react-native";
import emotes from './emote';
import {Image} from "react-native";

const renderMessage = (message, color) => {
    const messageComponents = [];
    const words = message.split(' ');
    let isFirstWord = true;
    let firstWordColor = color();

    words.forEach((word, index) => {
        if (emotes[word]) {
            // If the word is an emote, render an Image
            messageComponents.push(
                <Image
                    key={`emote-${index}`}
                    source={emotes[word]}
                    style={{width: 30, height: 30}}
                    resizeMode="contain"
                />
            );
            messageComponents.push(
                <Text key={`text-${index}`} style={styles.messageText}>
                    {' '}
                </Text>
            );
        } else {
            const textStyle = isFirstWord ?
                {...styles.messageText, fontWeight: 'bold', color: firstWordColor} :
                styles.messageText;

            messageComponents.push(
                <Text key={`text-${index}`} style={textStyle}>
                    {word + ' '}
                </Text>
            );
        }

        // Ensure only the first word is styled differently
        isFirstWord = false;
    });

    return <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{messageComponents}</View>;
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
        color: 'white',
    }
});

export default renderMessage;