import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';

import Button from '../utils/Button';
import SQLite from 'react-native-sqlite-storage';


//create and open the database
const db = SQLite.openDatabase({
    name: 'notes',
    location: 'default'
},
    () => {
        console.log("Connected to database");
    },
    error => console.error(error)
)


const NoteEditor = ({ route, navigation }) => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    var today = new Date();
    const [day, setDay] = React.useState(today.getDate());
    const [month, setMonth] = React.useState(today.getMonth() + 1);
    const [year, setYear] = React.useState(today.getFullYear());
    const [update, setUpdate] = React.useState(false);
    // var day = today.getDate();
    // var month = today.getMonth() + 1;
    // var year = today.getFullYear();

    const createtable = () => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS "
                + "Notes "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, Day INTEGER, Month INTEGER, Year INTEGER);")
        })
    }

    React.useEffect(() => {
        //create table if not EXISTS
        createtable();
        route.params !== undefined && setTitle(route.params.title);
        route.params !== undefined && setDesc(route.params.description);
        if (route.params !== undefined) {
            setDay(route.params.day);
            setMonth(route.params.month);
            setYear(route.params.year);
            console.log(route.params.day);
            setUpdate(true);
        }
    }, [])

    const saveToDb = async () => {
        console.log("Title = " + title.length + " Description = " + desc.length);
        if (title.length !== 0 && desc.length !== 0) {
            await db.transaction(async (tx) => {
                tx.executeSql(
                    "INSERT INTO Notes (Title, Description, Day, Month, Year) VALUES ('" + title + "','" + desc + "'," + day + "," + month + "," + year + ")",
                    [],
                    error => console.error(error),
                )
            })
            console.log("data saved successfully");
            navigation.replace('Home');
        } else {
            console.log("zero");
            Alert.alert("Title and description must not be empty.");
        }
    }

    const updateDb = () => {
        console.log("Update Title = " + title.length + " Description = " + desc.length);
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE Notes SET title = ?, description = ?, day = ?, month = ?, year = ? WHERE ID = ?",
                [title, desc, day, month, year, route.params.id],
                () => {
                    console.log("Update of ID= " + route.params.id + " success!");
                    setUpdate(false);
                    navigation.replace('Home');
                },
                error => console.error(error)
            )
        })
    }

    const deleteNote = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM Notes WHERE ID=?",
                [route.params.id],
                () => { console.log("Note deleted!"); navigation.replace('Home'); },
                error => console.error(error)
            )
        })
    }

    return (
        <View style={styles.body}>
            <TextInput
                value={title}
                placeholder="Enter note title"
                onChangeText={setTitle}
                // editable
                style={styles.title}
            />
            <Text style={styles.date}>{day}-{month}-{year}</Text>
            <TextInput
                value={desc}
                placeholder="Enter description"
                onChangeText={setDesc}
                style={styles.desc}
                // editable
                multiline
            />
            <View style={styles.bottomBar}>
                <Button color='#4E944F' onPress={() => update ? updateDb() : saveToDb()} delete='false' text="Save note" />
                <Button color='#FF6363' onPress={() => deleteNote()} text="Delete note" delete='true' />
                <Button color='#FFD369' onPress={() => navigation.replace('Home')} delete='' text="Cancel" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 20,
        color: '#000',
    },
    desc: {
        fontSize: 15,
        color: '#000'
    },
    date:{
        color: '#3f4045'
    },
    bottomBar: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        position: 'absolute',
        bottom: 0
    }
})

export default NoteEditor