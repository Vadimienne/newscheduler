import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

// import DateTimePicker from '@react-native-community/datetimepicker';
// import CheckBox from '@react-native-community/checkbox';
import { 
    Button, 
    View, 
    Text, 
    TextInput, 
    Alert, 
    StyleSheet,
    ScrollView, 
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';

import {
    addTodo,
    addTodoNote,
    deleteTodoNote,
    changeTodo
} from '@src/store/actions'

import colors from '@src/config/colors'

function CreateUpdateNote(props) {


    const { navigation, createTodo, addTodoNote, deleteTodoNote, changeTodo, route, todos } =  props
    const isEditing = route.params ? route.params.isEditing: false
    const todoId = route.params ? route.params.todoId: false

    // STATE
    //
    //
    
    const [ activityDescription, setActivityDescription ] = useState('')
    const [ isFormValid, setIsFormValid ] = useState(false)
    const [ notes, setNotes ] =  useState([])
    const [ noteInput, setNoteInput ] =  useState('')
    const [ todo, setTodo ] = useState(route.params? todos.find(el => el.id == route.params.item.id): null)
    const [ activityName, setActivityName ] = useState(isEditing? todo.activityName: '')

    useEffect(() => {
        if(isEditing){
            //console.log('PROPS', props.item)
            setNotes(route.params.item.notes)
            setTodo(todos.find(el => el.id == route.params.item.id))
        }
    })

    const handleAddNote = (note) => {
        if (!isEditing){
            setNotes([...notes, note])
            setNoteInput('')
        }
        else {
            addTodoNote({text: noteInput, id: todoId})
            setNoteInput('')
        }
        Keyboard.dismiss()
    }

    const handleDeleteNote = (note) => {
        if (!isEditing){
            let newNotes = notes.filter(el => el.id != note.id)
            setNotes([...newNotes])
        }
        else{
            deleteTodoNote({id: todoId, noteId: note.id})
        }
    }

    //console.log(notes)

    // 
    // 
    // STATE

    // Form validation effect
    useEffect(() => {
        if(activityName.trim().length)
        {
            setIsFormValid(true)
        }
        else{
            setIsFormValid(false)
        }
        
    }, [activityName])


    // Activity submission
    const submitActivity = async () => {
        let todo = {}
        Object.assign(todo, 
            {id: Date.now()},
            {activityName}, 
            {description: activityDescription},
            {isArchived: false},
            {isDone: false},
            {notes: [...notes]}
        )

        try {
            createTodo(todo)
        }
        catch(e){
            console.log(e)
        }
        navigation.navigate('Schedule')
    }



    //DATE TIME PICKER
    //*** 
    //***

    // date
    const [finishDate, setFinishDate] = useState(new Date());

    // is date picker shown
    const [showFinishDatepicker, setShowFinishDatepicker] = useState(false);

    // is date selected
    const [finishDateSelected, setFinishDateSelected] = useState(false)


    // when finish date selected
    const onFinishDateSelect = (event, selectedDate) => {
        const currentDate = selectedDate || finishDate;
        setShowFinishDatepicker(false)
        if (selectedDate){
            setFinishDateSelected(true)
        }
        
        setFinishDate(currentDate);
    };
    
    const openFinishDatepicker = () => {
        setShowFinishDatepicker(true);
    };

    const resetFinishDate = () => {
        setFinishDateSelected(false)
        setFinishDate(new Date())
    }

    const handleNameChange = (text) => {
        setActivityName(text)
        changeTodo({id: todoId, todo: Object.assign({}, todo, {activityName: text})})
    }

    // const handleAddTodoNote = () => {
    //     addTodoNote({id:})
    // }


    //*** 
    //*** 
    //DATE TIME PICKER
    const chosennotes = isEditing? todo.notes: notes

    return (
        <>
            <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor: colors.lightgreen}}>
                <View style={st.form}>

                    {/* Activity name */}
                    <View style={[ st.formEl ]}>
                        <Text style={st.menuLabel}>Activity Name</Text>
                        <TextInput
                            style={st.inputBox}
                            value={activityName}
                            onChangeText={(text) => handleNameChange(text)}
                            multiline
                        />
                    </View>
                    
                    

                    {/* Notes */}
                    <View style={[ st.formEl ]}>
                        <Text style={st.menuLabelSmall}>Notes</Text>
                        <TextInput
                            multiline
                            style={[st.inputBox, st.autoHeight]}
                            value={noteInput}
                            onChangeText={(text) => setNoteInput(text)}
                            onSubmitEditing={() => handleAddNote({text: noteInput, id: Date.now()})}
                        />
                        <TouchableOpacity onPress={() => handleAddNote({text: noteInput, id: Date.now()})}>
                            <View style={st.sendIconContainer}>
                                <Image 
                                    source={require('../assets/icons/send.png')}
                                    style={st.sendImage}
                                />
                            </View>
                        </TouchableOpacity>
                        {chosennotes.map(el => 
                            <View style={{display:'flex', flexDirection: 'row'}}>
                                <TouchableOpacity style={st.noteBox}><Text>{el.text}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteNote({id: el.id})}>
                                    <View style={st.deleteIconContainer}>
                                        <Image 
                                            source={require('../assets/icons/delete.png')}
                                            style={st.deleteImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                    </View>

                    {!isEditing && 
                    <TouchableOpacity 
                        title='Create'
                        onPress={isFormValid ? submitActivity : null}
                    >
                        <View style={!isFormValid? st.submitButtonIn: st.submitButton}>
                            <Text style={!isFormValid? st.submitTextIn: st.submitText}>CREATE</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
            </ScrollView>
      </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: state.todos,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTodo: (payload) => {
            dispatch(addTodo(payload))
        },
        addTodoNote: (payload) => {
            dispatch(addTodoNote(payload))
        },
        deleteTodoNote: (payload) => {
            dispatch(deleteTodoNote(payload))
        },
        changeTodo: (payload) => {
            dispatch(changeTodo(payload))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateNote)

const st = StyleSheet.create({
    submitButton:{
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        margin: 5,
        padding: 7,
        borderColor: '#f2f2f2',
        borderRadius: 2,
        // borderWidth: 1,
        justifyContent: "center",
        backgroundColor: colors.darkgreen,
        alignContent: 'center',
        borderWidth: 2,
        borderColor: colors.darkgreen,
        borderRadius:0 
    },
    submitText:{
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.lightgreen
    },
    submitButtonIn:{
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        margin: 5,
        padding: 7,
        borderColor: '#f2f2f2',
        borderRadius: 2,
        // borderWidth: 1,
        justifyContent: "center",
        backgroundColor: colors.lightgreen,
        alignContent: 'center',
        borderWidth: 2,
        borderColor: colors.darkgreen,
        borderRadius:0 
    },
    submitTextIn:{
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: "#444"
    },


    noteBox:{
        display:'flex',
        margin: 5,
        padding: 7,
        borderColor: '#f2f2f2',
        borderRadius: 2,
        // borderWidth: 1,
        width: '87%',
        
        justifyContent: "space-between",
        backgroundColor: colors.lightgreen,
        alignContent: 'center',
        borderWidth: 2,
        borderColor: colors.darkgreen,
        borderRadius:0 
    },
    form:{
        padding: 10
    },
    formEl:{
        marginBottom: 20
    },
    activityType: {
        display: "flex",
        flexDirection: "row"
    },
    activityTypeEl: {
        marginRight: 20

    },
    activityTypeName: {
        fontSize: 20
    },
    inputBox: {
        fontSize: 20,
        minWidth: '20%',
        paddingLeft: 10,
        //borderWidth: 1,
        //borderColor: '#ebebeb',
        //borderRadius: 4,
        //backgroundColor: '#fefefe',
        minHeight: 45,
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        borderRadius: 0,
        padding: 5
    },
    autoHeight: {
        height: undefined
    },
    textAlignRight: {
        //textAlign: 'right'
    },

    estimationsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    estimationText: {
        fontSize: 18,
        fontWeight: '700'
    },

    afterInputLabel: {
        fontSize: 18,
        color: "#555",
        marginLeft: 10,
        marginBottom: 10
    },
    menuLabel:{
        fontSize: 25,
        marginBottom: 5,
        color: "#555"
    },
    menuLabelSmall:{
        fontSize: 17,
        marginBottom: 5,
        color: "#555"
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    short: {
        width: 170
    },
    red: {
        color: 'red'
    },
    weekSelector: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'wrap'
    },
    selectDayBtn: {
        width: 54,
        marginBottom: 10,
        marginRight: 10
    },
    sendImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10,
        marginTop: 10

    },
    sendIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    deleteImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 0,
        right: -10,
        marginTop: 10

    },
    deleteIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    }
})

