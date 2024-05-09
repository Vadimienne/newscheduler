import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import weekDays from '../utils/weekDays';

function TaskInSchedule(props){

    const {
        id,
        activityName,
        minutesADay,
        days,
        onTaskDelete
    } = props

    return (
        <TouchableOpacity onPress={props.onNavigateToEditScreen}>
            <View style={styles.scheduleItem}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.activityName}>{activityName}</Text>
                    </View>
                    <View style={styles.minutesContainer}>
                        <Text style={styles.minutesText}>{minutesADay} min</Text>
                        <Text style={styles.minutesText}>, {days.map(day => `${weekDays.find(el => el.id == day).name} `)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onTaskDelete}>
                    <View style={styles.doneIconContainer}>
                        <Image 
                            source={require('../assets/icons/red-cross.png')}
                            style={styles.doneImage}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    scheduleItem:{
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        margin: 5,
        padding: 7,
        borderColor: '#f2f2f2',
        borderRadius: 2,
        borderWidth: 1,
        //justifyContent: "space-between",
        backgroundColor: "#f5f5f5"
    },
    activityName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#444"
    },
    minutesContainer: {
        marginLeft: 5,
        flexDirection: 'row'
    },
    minutesText: {
        color: "#555"
    },
    infoContainer: {
        display: 'flex',
        //flexDirection: 'row',
        justifyContent: "space-between",
        flex: 3,
        // borderColor: 'black',
        // borderWidth: 1
    },
    doneIconContainer: {
        //display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    doneImage:{
        width: 35,
        resizeMode: 'contain'
    }
})

export default TaskInSchedule