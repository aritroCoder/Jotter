import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Note from '../components/Note';
import Plusbtn from '../utils/Plusbtn';
import Quesbtn from '../utils/Quesbtn';

const Y_offset_plus = 520;

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

function Home({ navigation }) {
    const [plus_btn_posY, setPlus_btn_posY] = React.useState(0);
    const [note_no, setNote_no] = React.useState(0);
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getNotes = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT ID, Title, Description, Day, Month, Year FROM Notes",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        setNote_no(results.rows.length);
                        let notes = [];
                        for (var i = 0; i < len; ++i) {
                            var note = {
                                id: results.rows.item(i).ID,
                                title: results.rows.item(i).Title,
                                desc: results.rows.item(i).Description,
                                day: results.rows.item(i).Day,
                                month: results.rows.item(i).Month,
                                year: results.rows.item(i).Year
                            }
                            notes.push(note);
                        }
                        setNotes(notes);
                    }
                }
            )
        })
    }

    React.useEffect(() => {
        getNotes();
        setPlus_btn_posY(Y_offset_plus);
    }, [])

    React.useEffect(() => {
        console.log("no of notes: " + notes.length)
        setLoading(false);
    }, [notes])

    return (
        <>
            <ScrollView style={{flex: 1, backgroundColor:'#E9EFC0' }} >
                <View style={styles.body}>
                    {!loading && notes.map((note, i) => (
                        <Note key={note.id} id={note.id} callback={navigation} title={note.title} description={note.desc} day={note.day} month={note.month} year={note.year} />
                    ))}
                    {note_no === 0 && (
                        <Text style={styles.placeholder}>Create a new note to show here!</Text>
                    )}
                </View>
            </ScrollView>
            <Plusbtn callback={navigation} Yoffset={plus_btn_posY} />
            <Quesbtn callback={navigation} Yoffset={plus_btn_posY+60}/>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: '#E9EFC0',
        // height: 850,
    },
    placeholder: {
        fontSize: 25,
        margin: 10
    }
})

export default Home;
