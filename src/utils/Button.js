import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const Button = (props) => {
    return (
        <Pressable onPress={props.onPress} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : props.color, ...styles.button })} android_ripple={{ color: "#4D4C7D" }} >
            {props.delete.length === 0 && <Text style={styles.text}>
                {props.text}
            </Text>}
            {props.delete === 'true' && <FontAwesomeIcon icon={faTrashCan} />}
            {props.delete === 'false' && <FontAwesomeIcon icon={faFloppyDisk} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    text: {
        color: '#000000',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    }
});

export default Button;