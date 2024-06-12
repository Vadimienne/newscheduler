import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { 
    Button, 
    View, 
    Text, 
    TextInput, 
    Alert, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';

import colors from '@src/config/colors'

import CoolButton from '@src/components/CoolButton'

import {editTodo} from '@src/store/actions'

function NewActivity({ navigation, createTodo, route, editTodo, todos }) {

    // const [ notes, setNotes ] = useState([])
    const [ noteInput, setNoteInput ] = useState('')
    const [ task, setTask ] = useState({})
    
    
    useEffect(() => {   
        setTask(todos.find(el => el.id == route.params.item.id))
        //console.log('TODOS:', todos.find(el => el.id == route.params.task.id))
    }, [todos])

    // let task = route.params.item

    let notes = task.notes? task.notes: []
    
    let onAddNote = () => {
        let notesCopy = JSON.parse(JSON.stringify(notes))
        notesCopy.unshift({
            text: noteInput,
            id: Date.now()
        })
        // setNotes(notesCopy)
        editTodo(Object.assign({}, task, {notes: notesCopy}))
        setNoteInput('')
        Keyboard.dismiss()
    }

    let onRemoveNote = (id) => {
        let notesCopy = JSON.parse(JSON.stringify(notes))
        notesCopy = notesCopy.filter(el => el.id != id)
        editTodo(Object.assign({}, task, {notes: notesCopy}))
    }

    return (
        <>
            <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor: colors.lightgreen}}>
                <View style={st.form}>
                    <Text style={st.activityTitle}>{task.activityName} <Text style={st.minutesADay}>{task.minutesADay} min</Text></Text>
                </View>
                <View style={st.noteContainer}>
                    <TextInput style={st.noteInput} value={noteInput} multiline onChangeText={text => setNoteInput(text)} placeholder='Type a note...'/>
                    <CoolButton buttonStyle={st.noteAddBtn} titleStyle={st.noteAddBtnText} title={'Add'} onPress={onAddNote}>add</CoolButton>
                </View>
                <View style={{marginTop: 20}}>
                    {notes.map((el, index) => {
                        return (
                            <View style={st.noteContainer}>
                                <View style={st.noteElement} key={`note-element-${index}`}>
                                    <Text style={st.noteText}>{el.text}</Text>
                                </View>
                                <CoolButton buttonStyle={[st.noteAddBtn, st.deleteButton]} titleStyle={st.noteAddBtnText} title={'Delete'} onPress={() => onRemoveNote(el.id)}>add</CoolButton>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
      </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editTodo: (payload) => {
            dispatch(editTodo(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity)

const st = StyleSheet.create({

    activityTitle: {
        fontSize: 25,
        fontWeight: "700"
    },
    minutesADay: {
        fontWeight: 'normal',
        fontSize: 20
    },
    form:{
        padding: 10,
        //backgroundColor: colors.lightgreen
    },
    noteContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    noteElement: {
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        margin: 5,
        width: '80%'
    },
    noteText: {
        flexWrap: 'wrap',
        padding: 7
    },
    noteInput: {
        width: '82%',
        marginLeft: 5,
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        borderRadius: 0,
        padding: 5
    },
    noteAddBtn: {
        height: 30,
        backgroundColor: colors.darkgreen,//'#00c92c',
        color: colors.lightgreen,//'#fff',  
        marginTop: 5
    },
    deleteButton: {
        backgroundColor: colors.darkgreen,//'#ad0900'
    },
    noteAddBtnText: {
        color: colors.lightgreen,
        padding: 5,
        fontWeight:'500',
        //textTransform: 'capitalize'
    }
    
})