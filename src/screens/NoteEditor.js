import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

import Button from '../utils/Button';
import SQLite from 'react-native-sqlite-storage';

var update = false;

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
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();

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
        if(route.params !== undefined) update = true ;
    }, [])

    const saveToDb = async () => {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO Notes (Title, Description, Day, Month, Year) VALUES ('"+title+"','"+desc+"',"+day+","+month+","+year+")",
                [],
                error=> console.error(error),
            )
        })
        console.log("data saved successfully");
        navigation.replace('Home');
    }

    const updateDb = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE Notes SET title = ?, description = ?, day = ?, month = ?, year = ? WHERE ID = ?",
                [title, desc, day, month, year, route.params.id],
                ()=>{console.log("Update of ID= "+ route.params.id +" success!"); 
                update = false;
                navigation.replace('Home');},
                error=> console.error(error)
            )
        })
    }

    const deleteNote = ()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "DELETE FROM Notes WHERE ID=?",
                [route.params.id],
                ()=>{console.log("Note deleted!"); navigation.replace('Home');},
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
            <TextInput
                value={desc}
                placeholder = "Enter description"
                onChangeText = {setDesc}
                style={styles.desc}
                // editable
                multiline
            />
            <View style={styles.bottomBar}>
                <Button color='#4E944F' onPress={() => update? updateDb() : saveToDb()} delete='false' text="Save note" />
                <Button color='#FF6363' onPress={() => deleteNote()} text="Delete note" delete = 'true' />
                <Button color='#E9EFC0' onPress={() => navigation.replace('Home')} delete='' text="Cancel" />
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
        fontSize: 20
    },
    desc:{
        fontSize:15
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