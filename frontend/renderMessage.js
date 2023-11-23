import {StyleSheet, Text, View} from "react-native";
import emotes from './emote';
import {Image} from "react-native";

const renderMessage = (message) => {
    const messageComponents = [];
    const words = message.split(' ');

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
            // If the word is not an emote, render it as text
            messageComponents.push(
                <Text key={`text-${index}`} style={styles.messageText}>
                    {word + ' '}
                </Text>
            );
        }
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
        marginVertical: 5,
    },
    messageText: {
        color: 'white'
    }
});

export default renderMessage;