import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { todoDoneLtrl, todoSuspendedLtrl } from '@src/stringLiterals';
import TextTicker from 'react-native-text-ticker';

function TaskInSchedule(props){

    const {
        activityName,
        minutesADay,
        isTemporal,
        description,
        status,
        onTaskDone,
        onTaskSuspended,
        onTaskActivated,
        isBackgroundGrey
    } = props

    return (
        <TouchableOpacity onPress={props.onNavigateToDashboard}>
            <View style={[styles.scheduleItem, isBackgroundGrey? styles.scheduleItemGrey: null]} >
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.activityName}>{activityName}</Text>
                    </View>
                    <View style={styles.minutesContainer}>
                        {!isTemporal
                            ?   <Text style={styles.minutesText}>{minutesADay} min</Text>
                            :   <TextTicker 
                                    scrollSpeed={100} 
                                    style={{marginRight: 10}}
                                    repeatSpacer={60}
                                    animationType='scroll'
                                >
                                    {description}
                                </TextTicker>
                        }
                    </View>
                </View>
                { status !== todoSuspendedLtrl && status !== todoDoneLtrl &&
                <>
                    <TouchableOpacity onPress={onTaskDone}>
                        <View style={styles.doneIconContainer}>
                            <Image 
                                source={require('../assets/icons/checkmark.png')}
                                style={styles.doneImage}
                            />
                        </View>
                    </TouchableOpacity>
                    { onTaskSuspended ? 
                    <TouchableOpacity onPress={onTaskSuspended}>
                        <View style={styles.suspendIconContainer}>
                            <Image 
                                source={require('../assets/icons/grey-cross.png')}
                                style={styles.suspendImage}
                            />
                        </View>
                    </TouchableOpacity>
                    :
                    <View></View>
                    }
                </>}
                {(status === todoSuspendedLtrl || status === todoDoneLtrl) &&
                    <TouchableOpacity onPress={onTaskActivated}>
                        <View style={styles.undoIconContainer}>
                            <Image 
                                source={require('../assets/icons/undo-arrow.png')}
                                style={styles.undoImage}
                            />
                        </View>
                    </TouchableOpacity>
                }
    
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
        // borderWidth: 1,
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        alignContent: 'center',
    },
    scheduleItemGrey: {
        backgroundColor: "#f5f5f5"
    },
    activityName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#444"
    },
    minutesContainer: {
        marginLeft: 5,
        paddingRight: 10
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
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        marginRight: 15,
        marginTop: -5
        
    },
    doneImage:{
        width: 30,
        resizeMode: 'contain'
    },
    suspendIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 5,
        marginTop: -15
        
    },
    suspendImage:{
        width: 33,
        resizeMode: 'contain'
    },
    undoIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 5,
        marginTop: -25
        
    },
    undoImage:{
        width: 27,
        resizeMode: 'contain'
    },
})

export default TaskInSchedule