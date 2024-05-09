import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import {
    changeTodoStatus,
    removeTempTodo
} from '@src/store/actions';

import colors from '@src/config/colors'

import {
    todoDoneLtrl,
    todoSuspendedLtrl,
    todoActiveLtrl
} from '@src/stringLiterals'
import TaskInSchedule from '@src/components/TaskInSchedule'
import CoolButton from '@src/components/CoolButton'

function Schedule (props){

    const {
        changeTodoStatus,
        removeTempTodo,
        todaySchedule,
        lastFormScheduleTime,
        navigation
    } = props

    const [activeTasks, setActiveTasks] = useState([])
    const [doneTasks, setDoneTasks] = useState([])
    const [suspendedTasks, setSuspendedTasks] = useState([])

    // console.log('update!')

    useEffect(() => {
        let newActive = todaySchedule.filter(el => el.status !== todoDoneLtrl && el.status !== todoSuspendedLtrl)
        setActiveTasks(newActive)

        let newDone = todaySchedule.filter(el => el.status === todoDoneLtrl)
        setDoneTasks(newDone)

        let newSuspended = todaySchedule.filter(el => el.status === todoSuspendedLtrl)
        setSuspendedTasks(newSuspended)
    }, [todaySchedule])

    

    // Change task status

    const handleTaskDone = (task) => {
        changeTodoStatus({id: task.id, status: todoDoneLtrl})
    }

    const handleTaskSuspended = (task) => {
        changeTodoStatus({id: task.id, status: todoSuspendedLtrl})
    }

    const handleTaskActivate = (task) => {
        changeTodoStatus({id: task.id, status: todoActiveLtrl})
    }

    const handleTempTaskDone = (task) => {
        removeTempTodo(task)
    }


    // Item markup for sortable container

    renderItem = (item, index) => {
        // every second item can be of different color
        let isBackgroundGrey = index % 2
        return(
            !item.isTemporal? 
                <TaskInSchedule 
                    onNavigateToDashboard={() => navigation.navigate('ActivityDashboard', {item: item})}
                    {...item}
                    key={`task-in-sche-${index}`}
                    onTaskDone={() => handleTaskDone(item)}
                    onTaskSuspended={() => handleTaskSuspended(item)}
                    onTaskActivated={() => handleTaskActivate(item)}
                />
            :
                <TaskInSchedule 
                    onNavigateToDashboard={() => 0}
                    {...item}
                    key={`task-in-sche-${index}`}
                    onTaskDone={() => handleTempTaskDone(item)}
                    // onTaskSuspended={() => handleTaskSuspended(item)}
                    // onTaskActivated={() => handleTaskActivate(item)}
                />
        )
    }


    return(
        <View style={{flex: 1}}> 
                
                    <>
                        <ScrollView>
                            <Text style={[styles.categoryHeader, styles.categoryActive]}>Active</Text>
                            {activeTasks.map((el, index) => renderItem(el, index))}
    
                            <Text style={[styles.categoryHeader, styles.categoryDone]}>Done</Text>
                            {doneTasks.map((el, index) => renderItem(el, index))}
    
                            <Text style={[styles.categoryHeader, styles.categorySuspended]}>Suspended</Text>
                            {suspendedTasks.map((el, index) => renderItem(el, index))}
                        </ScrollView>
                        
                    </>
                    
                    
                
                <View style={styles.addButton}>
                        <CoolButton 
                            title='Add temporal task' 
                            buttonStyle={styles.addCoolButton} 
                            titleStyle={styles.addCoolButtonTitle} 
                            onPress={() => navigation.navigate('NewTempActivity')}
                            // onPress={() => pushScheduledNotification()}
                            // onPress={() => cancelAllNotifications()}
                        />
                </View>
        </View>
    )
    
}

const styles = StyleSheet.create({

    categoryHeader: {
        fontSize: 27,
        fontWeight: '700',
        paddingLeft: 20,
        padding: 5,
        // backgroundColor: "#ebebeb" ,
        // backgroundColor: "#f5f5f5",
        borderLeftWidth: 10
    },
    categoryActive: {
        borderLeftColor: "#ffa73b"
    },
    categoryDone: {
        borderLeftColor: colors.green
    },
    categorySuspended: {
        borderLeftColor: "#fff23b"
    },

    timer: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    addButton: {
        bottom: 0
    },
    addCoolButton: {
        backgroundColor: colors.green,
        height: 60,
        borderRadius: 0,
    },
    addCoolButtonTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 45,
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        todaySchedule: state.todaySchedule,
        lastFormScheduleTime: state.lastFormScheduleTime
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeTodoStatus: (payload) => {
            dispatch(changeTodoStatus(payload))
        },
        removeTempTodo: (payload) => {
            dispatch(removeTempTodo(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)











/* <ScrollView >
                        <Text>Active</Text>
                        <DraggableFlatList
                            data={activeTasks}
                            renderItem={renderItem}
                            activationDistance={10}
                            keyExtractor={(item) => item.sortableId}
                            onDragEnd={handleSortActive}
                            animationConfig={{
                                damping: 10000000,
                                mass: 1,
                                stiffness: 1000,
                                overshootClamping: false,
                                restDisplacementThreshold: 0.1,
                                isInteraction: false,
                                useNativeDriver: true
                            }} 
                        />
                        <Text>Done</Text>
                        <DraggableFlatList
                            data={doneTasks}
                            renderItem={renderItem}
                            activationDistance={10}
                            keyExtractor={(item) => item.sortableId}
                            onDragEnd={handleSort}
                            animationConfig={{
                                damping: 10000000,
                                mass: 1,
                                stiffness: 1000,
                                overshootClamping: false,
                                restDisplacementThreshold: 0.1,
                                isInteraction: false,
                                useNativeDriver: true
                            }} 
                        />
                        <Text>Not today</Text>
                        <DraggableFlatList
                            data={suspendedTasks}
                            renderItem={renderItem}
                            activationDistance={10}
                            keyExtractor={(item) => item.sortableId}
                            onDragEnd={handleSort}
                            animationConfig={{
                                damping: 10000000,
                                mass: 1,
                                stiffness: 1000,
                                overshootClamping: false,
                                restDisplacementThreshold: 0.1,
                                isInteraction: false,
                                useNativeDriver: true
                            }} 
                        />
                    </ScrollView> */