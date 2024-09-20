import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { todoDoneLtrl, todoSuspendedLtrl } from '@src/stringLiterals';
import TextTicker from 'react-native-text-ticker';
import colors from '@src/config/colors'
import { archiveTodo } from '../store/actions';

function TaskInSchedule(props){

    const {
        activityName,
        minutesADay,
        isTemporal,
        description,
        isDone,
        isArchived,
        isArchive,
        onTaskDone,
        onTaskUndone,
        onTaskArchive,
        onTaskUnarchive,
        onTaskDelete,
        onTaskSuspended,
        onTaskActivated,
        isBackgroundGrey
    } = props

    return (
        <TouchableOpacity onPress={props.onNavigateToDashboard} onLongPress={() => {}}>
            <View style={[styles.scheduleItem, isBackgroundGrey? styles.scheduleItemGrey: null]} >
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.activityName}>{activityName}</Text>
                    </View>
                    {/* <View style={styles.minutesContainer}>
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
                    </View> */}
                </View>
                { !isArchive && !isDone &&
                <>
                    <TouchableOpacity onPress={onTaskDone}>
                        <View style={styles.doneIconContainer}>
                            <Image 
                                source={require('../assets/icons/darkGreenCheckMark.png')}
                                style={styles.doneImage}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* { onTaskSuspended ? 
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
                    } */}
                </>}
                { !isArchive && isDone &&
                    <>
                        <TouchableOpacity onPress={onTaskArchive}>
                            <View style={styles.archiveIconContainer}>
                                <Image 
                                    source={require('../assets/icons/archive.png')}
                                    style={styles.archiveImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onTaskUndone}>
                            <View style={styles.undoIconContainer}>
                                <Image 
                                    source={require('../assets/icons/undo-arrow.png')}
                                    style={styles.undoImage}
                                />
                            </View>
                        </TouchableOpacity>
                </>
                }
                {
                    isArchive &&
                    <>
                        <TouchableOpacity onPress={onTaskUnarchive}>
                            <View style={styles.unarchiveIconContainer}>
                                <Image 
                                    source={require('../assets/icons/unarchive.png')}
                                    style={styles.archiveImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onTaskDelete}>
                            <View style={styles.unarchiveIconContainer}>
                                <Image 
                                    source={require('../assets/icons/cross.png')}
                                    style={styles.archiveImage}
                                />
                            </View>
                        </TouchableOpacity>
                    </>
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
        backgroundColor: colors.lightgreen,
        alignContent: 'center',
        borderWidth: 2,
        borderColor: colors.darkgreen,
        borderRadius:0 
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
        width: 35,
        height: 35, 
        resizeMode: 'contain',
        position:'relative',
        marginRight: 0,
        marginTop: 14
    },
    suspendIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 5,
        marginTop: -15
        
    },
    suspendImage:{
        width: 13,
        height: 13, 
        resizeMode: 'contain'
    },
    undoIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 7,
        marginTop: 10
        
    },
    archiveIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 20,
        marginTop: 7
        
    },
    unarchiveIconContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        marginRight: 5,
        marginTop: 5
        
    },
    undoImage:{
        width: 35,
        height: 35, 
        resizeMode: 'contain'
    },
    archiveImage:{
        width: 40,
        height: 40, 
        resizeMode: 'contain'
    },
})

export default TaskInSchedule