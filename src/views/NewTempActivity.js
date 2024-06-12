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
    ScrollView
} from 'react-native';

import {addTempTodo} from '@src/store/actions'

import colors from '@src/config/colors'

function NewActivity({ navigation, createTempTodo }) {

    // STATE
    //
    //
    const [ activityName, setActivityName ] = useState('')
    const [ activityDescription, setActivityDescription ] = useState('')
    const [ isFormValid, setIsFormValid ] = useState(false)


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
            {description: activityDescription}
        )

        try {
            createTempTodo(todo)
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


    //*** 
    //*** 
    //DATE TIME PICKER

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
                            onChangeText={(text) => setActivityName(text)}
                        />
                    </View>
                    
                    {/* Finish date selector */}
                    {/* <View style={st.formEl}>
                        <Text style={st.menuLabel}>Finish date (opt.)</Text>
                        <View style={st.short}>
                            <Button 
                                onPress={openFinishDatepicker} 
                                title="Set finish date" 
                            />
                        </View>
                        
                        <View>
                            {showFinishDatepicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={finishDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onFinishDateSelect}
                                />
                            )}
                        </View>
                        {finishDateSelected && 
                            <>
                                <Text>{finishDate.toDateString()}</Text>
                                <View style={st.short}>
                                    <Button onPress={resetFinishDate} title="Remove finish date" />
                                </View>
                            </>
                        }
                    </View> */}

                    {/* Time a day */}
                    <View style={[ st.formEl ]}>
                        <Text style={st.menuLabelSmall}>Description</Text>
                        <TextInput
                            multiline
                            style={[st.inputBox, st.autoHeight]}
                            value={activityDescription}
                            onChangeText={(text) => setActivityDescription(text)}
                        />
                    </View>

                    <Button 
                        color={isFormValid? '#00c92c': 'grey'}
                        title='Create'
                        onPress={submitActivity}
                        disabled={!isFormValid}
                    />
                </View>
            </ScrollView>
      </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTempTodo: (payload) => {
            dispatch(addTempTodo(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity)

const st = StyleSheet.create({
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
        height: 45,
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
    }
})

