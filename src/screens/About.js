import React from 'react';
import { View, Text, StyleSheet,Linking } from 'react-native';
import Button from '../utils/Button';

const About = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <Text style={styles.header}>Designed and developed by: Aritra Bhaduri (EEE, IIT Patna)</Text>
            <Text style={styles.text}>Click the '+' button in home page to create a note.</Text>
            <Text style={styles.text}>To edit an existing note, click the note from home page.</Text>
            <View style={styles.btnholder}>
                <Button onPress={()=>Linking.openURL('https://github.com/aritroCoder/Jotter')} color='#FFD369' text='Report an issue' delete='' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        color: '#000'
    },
    text: {
        marginTop: 10,
        fontSize: 15,
        color: '#000'
    },
    btnholder:{
        flexDirection: 'row',
        width: '100%',
        height: 80
    }
})
export default About; 