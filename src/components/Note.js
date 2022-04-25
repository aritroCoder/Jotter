import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Note = (props) => {
    const noteClickHandler = ()=>{
        props.callback.replace("noteEditor", {title: props.title, description: props.description, day: props.day, month: props.month, year: props.year, id: props.id});
    }
  return (
      <Pressable android_ripple={{color: '#F9FFA4'}} style={styles.notebg} onPress={()=>noteClickHandler()}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.body}>{props.description.length > 20 ? props.description.substring(0, 20) : props.description }
          </Text> 
          {/* 20 words only */}
      </Pressable>
  )
}

const styles = StyleSheet.create({
    notebg:{
        backgroundColor: '#B4E197',
        width: 170,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    title:{
        fontSize:20,
        color:'#000'
    },
    body:{
        fontSize:15,
    }
})

export default Note