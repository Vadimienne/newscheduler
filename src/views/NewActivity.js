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

import CoolButton from '@src/components/CoolButton'

import {addTodo} from '@src/store/actions'

import minutesToHours from '@src/utils/minutesToHours'

import colors from '@src/config/colors'

function NewActivity({ navigation, createTodo }) {

    // STATE
    //
    //
    const [ activityName, setActivityName ] = useState('')
    const [ isMentalActivity, toggleActivityType ] = useState(true)
    const [ minutesADay, setMinutesADay ] = useState('')
    const [ isFormValid, setIsFormValid ] = useState(false)
    const [ isDaysAWeekActive, setIsDaysAWeekActive] = useState(false)
    const [ estTimeWeek, setEstTimeWeek ] = useState('')
    const [ estTimeMonth, setEstTimeMonth ] = useState('')
    const [ estTimeYear, setEstTimeYear ] = useState('')


    const [ daysAWeek, setDaysAWeek ] = useState([
        {id: 1, name: 'Mon', isActive: false},
        {id: 2, name: 'Tue', isActive: false},
        {id: 3, name: 'Wed', isActive: false},
        {id: 4, name: 'Thu', isActive: false},
        {id: 5, name: 'Fri', isActive: false},
        {id: 6, name: 'Sat', isActive: false},
        {id: 0, name: 'Sun', isActive: false}
    ])

    // 
    // 
    // STATE

    // // Check if any day is selected (to calculate estimated time spend)
    // useEffect(() => {
    //     let isActive = daysAWeek.filter(el => el.isActive).length 

    //     if(isActive) {
    //         setIsDaysAWeekActive(true)
    //     }
    //     else{
    //         setIsDaysAWeekActive(false)
    //     }

    // }, [daysAWeek])

    // Calculate time spend estimations
    useEffect(() => {
        console.log('effect invoked!')
        let calculateWeek = () => {
            return minutesADay * daysAWeek.filter(el => el.isActive).length 
        }

        

        if (daysAWeek.filter(el => el.isActive).length && minutesADay) {
            let weekEstTime = calculateWeek()
            setEstTimeWeek(minutesToHours(weekEstTime).hours)
            setEstTimeMonth(minutesToHours(weekEstTime * 4).hours)
            setEstTimeYear(minutesToHours(weekEstTime * 52).hours)
        }

    }, [daysAWeek, minutesADay, isDaysAWeekActive])

    // Form validation effect
    useEffect(() => {
        if( minutesADay.trim().length &&
            activityName.trim().length &&
            daysAWeek.filter(el => el.isActive).length)
        {
            setIsFormValid(true)
        }
        else{
            setIsFormValid(false)
        }
        
    }, [activityName, isMentalActivity, minutesADay, daysAWeek])

    // Get id of a day. Toggle this particular day.
    const toggleActiveDay = (numOfDay) => {
        let newDaysAWeek = JSON.parse(JSON.stringify(daysAWeek))
        let targetDayIndex = newDaysAWeek.findIndex(el => el.id == numOfDay)
        newDaysAWeek[targetDayIndex] = {...newDaysAWeek[targetDayIndex], isActive: !newDaysAWeek[targetDayIndex].isActive}
        setDaysAWeek(newDaysAWeek)
    } 


    // Activity submission
    const submitActivity = async () => {
        let todo = {}
        Object.assign(todo, 
            {id: Date.now()},
            {activityName}, 
            {isMentalActivity}, 
            {days: daysAWeek.filter(el => el.isActive != false).map(el => el.id)},
            {minutesADay: minutesADay},
            {finishDate: finishDateSelected? finishDate: null}
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

    console.log('estimations: ', estTimeWeek, estTimeMonth, estTimeYear)

    //*** 
    //*** 
    //DATE TIME PICKER

    return (
        <>
            <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor: colors.lightgreen}}>
                <View style={st.form}>
                    {/* Activity type selector. Mental/Physical */}
                    {/* <View style={[ st.formEl, st.activityType ]}>
                        <View style={st.activityTypeEl}>
                            <Text style={st.activityTypeName}>Mental</Text>
                            <CheckBox
                                value={isMentalActivity}
                                onValueChange={() => toggleActivityType(!isMentalActivity)}
                            /> 
                        </View>
                        <View style={st.activityTypeEl}>
                            <Text style={st.activityTypeName}>Physical</Text>
                            <CheckBox
                                value={!isMentalActivity}
                                onValueChange={() => toggleActivityType(!isMentalActivity)}
                            /> 
                        </View>
                    </View> */}

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
                        <Text style={st.menuLabel}>Time a day</Text>
                        <View style={st.timeInputContainer}>
                            <TextInput
                                style={[st.inputBox, st.textAlignRight]}
                                keyboardType={'numeric'}
                                value={minutesADay}
                                onChangeText={(text) => setMinutesADay(text)}
                            />
                            <Text style={st.afterInputLabel}>minutes</Text>
                        </View>
                    </View>

                    

    
                    {/* Days of week selector */}
                    <View style={[ st.formEl ]}>
                        <Text style={st.menuLabel}>Days</Text>
                        <View style={st.weekSelector}>
                            {
                                daysAWeek.map(el => 
                                    <View style={st.selectDayBtn} key={`week-day-view-${el.id}`}>
                                        {/* <Button 
                                            color={el.isActive? '#00c92c': 'grey'}
                                            key={`week-day-btn-${el.id}`}
                                            title={el.name}
                                            onPress={() => toggleActiveDay(el.id)}
                                        /> */}
                                        <CoolButton 
                                            //color={el.isActive? colors.lightgreen: colors.darkgreen}
                                            key={`week-day-btn-${el.id}`}
                                            title={el.name}
                                            buttonStyle={!!el.isActive? st.activeButtonStyle: st.disabledButtonStyle}
                                            titleStyle={!!el.isActive? st.activeButtonStyleTitle: st.disabledButtonStyleTitle}
                                            //borderColor={colors.darkgreen}
                                            //style={{borderColor: colors.darkgreen}}
                                            onPress={() => toggleActiveDay(el.id)}
                                        />
                                    </View>
                                )
                            }
                        </View>
                        
                    </View>

                    {/* Spend time estimation */}
                    {daysAWeek.filter(el => el.isActive).length && minutesADay && estTimeMonth && estTimeWeek && estTimeYear
                    ? 
                    <View style={[st.formEl, st.estimationsContainer]}>
                        <View>
                            <Text style={st.estimationText}>{`${estTimeWeek? estTimeWeek + ' h': ''}`}</Text>
                            <Text style={st.estimationTextLabel}>{`a week`}</Text>
                        </View>
                        <View>
                            <Text style={st.estimationText}>{`${estTimeMonth? estTimeMonth + ' h': ''}`}</Text>
                            <Text style={st.estimationTextLabel}>{`a month`}</Text>
                        </View>
                        <View>
                            <Text style={st.estimationText}>{`${estTimeYear? estTimeYear + ' h': ''}`}</Text>
                            <Text style={st.estimationTextLabel}>{`a year`}</Text>
                        </View>
                    </View>
                    :
                    <View></View>}

                    {/* <Button 
                        color={isFormValid? '#00c92c': 'grey'}
                        title='Create activity'
                        onPress={submitActivity}
                        disabled={!isFormValid}
                    /> */}
                    <CoolButton 
                        title='Create activity'
                        onPress={submitActivity}
                        disabled={!isFormValid}
                        buttonStyle={!!isFormValid? st.activeButtonStyle: st.disabledButtonStyle}
                        titleStyle={!!isFormValid? st.activeButtonStyleTitle: st.disabledButtonStyleTitle}
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
        createTodo: (payload) => {
            dispatch(addTodo(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity)

const st = StyleSheet.create({
    disabledButtonStyle:{
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        borderRadius: 0,
        padding: 5,
        backgroundColor: colors.lightgreen
    },
    disabledButtonStyleTitle:{
        color: colors.darkgreen,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    activeButtonStyle:{
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        borderRadius: 0,
        padding: 5,
        backgroundColor: colors.darkgreen
    },
    activeButtonStyleTitle:{
        color: colors.lightgreen,
        fontWeight: '800',
        textTransform: 'uppercase'
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
        borderWidth: 1,
        //borderColor: '#ebebeb',
        //borderRadius: 4,
        //backgroundColor: '#fefefe',
        height: 45,
        borderColor: colors.darkgreen,//'#ebebeb',
        borderWidth: 1,
        borderRadius: 0,
        padding: 5
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

