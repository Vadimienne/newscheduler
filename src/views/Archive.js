import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import {
    changeTodoStatus,
    removeTempTodo,
    doneTodo,
    undoneTodo,
    unarchiveTodo,
    deleteTodo
} from '@src/store/actions';

import colors from '@src/config/colors'

import {
    todoDoneLtrl,
    todoSuspendedLtrl,
    todoActiveLtrl
} from '@src/stringLiterals'
import TaskInSchedule from '@src/components/TaskInSchedule'
import CoolButton from '@src/components/CoolButton'

function Archive (props){

    const {
        changeTodoStatus,
        removeTempTodo,
        todaySchedule,
        lastFormScheduleTime,
        navigation,
        doneTodo,
        undoneTodo,
        archiveTodo,
        unarchiveTodo,
        deleteTodo,
        todos
    } = props

    const [archivedTasks, setArchivedTasks] = useState([])
    const [doneTasks, setDoneTasks] = useState([])
    // const [suspendedTasks, setSuspendedTasks] = useState([])
    const [tasks, setTasks] = useState([])

    // console.log('update!')

    useEffect(() => {
        

        setArchivedTasks(todos.filter(el => el.isArchived))

        // let newSuspended = todaySchedule.filter(el => el.status === todoSuspendedLtrl)
        // setSuspendedTasks(newSuspended)

    }, [todos])

    

    // Change task status

    const handleTaskDone = (task) => {
        doneTodo({id: task.id})
    }

    const handleTaskUndone = (task) => {
        undoneTodo({id: task.id})
    }

    const handleTaskUnarchive = (task) => {
        unarchiveTodo({id: task.id})
    }


    const handleTaskSuspended = (task) => {
        changeTodoStatus({id: task.id, status: todoSuspendedLtrl})
    }

    const handleTaskActivate = (task) => {
        changeTodoStatus({id: task.id, status: todoActiveLtrl})
    }


    const handleTaskDelete = (task) => {
        deleteTodo({id: task.id})
    }

    const handleTempTaskDone = (task) => {
        removeTempTodo(task)
    }


    // Item markup for sortable container

    renderItem = (item, index) => {
        // every second item can be of different color
        let isBackgroundGrey = index % 2
        return(
            // !item.isTemporal? 
                <TaskInSchedule 
                    onNavigateToDashboard={() => navigation.navigate('CreateUpdateNote', {item: item, isEditing: true, todoId: item.id})}
                    {...item}
                    key={`task-in-sche-${index}`}
                    isArchive
                    onTaskDone={() => handleTaskDone(item)}
                    onTaskUndone={() => handleTaskUndone(item)}
                    onTaskArchive={() => handleTaskArchive(item)}
                    onTaskDelete={() => handleTaskDelete(item)}
                    onTaskUnarchive={() => handleTaskUnarchive(item)}
                    onTaskSuspended={() => handleTaskSuspended(item)}
                    onTaskActivated={() => handleTaskActivate(item)}
                />
            // :
            //     <TaskInSchedule 
            //         onNavigateToDashboard={() => 0}
            //         {...item}
            //         key={`task-in-sche-${index}`}
            //         onTaskDone={() => handleTempTaskDone(item)}
            //         // onTaskSuspended={() => handleTaskSuspended(item)}
            //         // onTaskActivated={() => handleTaskActivate(item)}
            //     />
        )
    }


    return(
        <View style={{flex: 1, backgroundColor: colors.lightgreen}}> 
                
                    <>
                        <ScrollView>
                            
    
                            {/* <Text style={[styles.categoryHeader, styles.categoryDone]}>Done</Text> */}
                            {archivedTasks.map((el, index) => renderItem(el, index))}
    
                            {/* <Text style={[styles.categoryHeader, styles.categorySuspended]}>Suspended</Text>
                            {suspendedTasks.map((el, index) => renderItem(el, index))} */}
                            {/* {todos.map((el, index) => renderItem(el, index))} */}
                        </ScrollView>
                        
                    </>
                    
                    
                
                {/* <View style={styles.addButton}>
                        <CoolButton 
                            title='Write Note' 
                            buttonStyle={styles.addCoolButton} 
                            titleStyle={styles.addCoolButtonTitle} 
                            onPress={() => navigation.navigate('NewNote')}
                            decorationOffset
                            isDecoratedText
                            // onPress={() => pushScheduledNotification()}
                            // onPress={() => cancelAllNotifications()}
                        />
                </View> */}
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
        borderLeftColor: colors.darkgreen//"#ffa73b"
    },
    categoryDone: {
        borderLeftColor: colors.darkgreen//colors.green
    },
    categorySuspended: {
        borderLeftColor: colors.darkgreen//"#fff23b"
    },

    timer: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    addButton: {
        bottom: 0
    },
    addCoolButton: {
        backgroundColor: colors.lightgreen,
        height: 60,
        borderRadius: 0,
        borderTopColor: colors.darkgreen,
        borderTopWidth: 3
    },
    addCoolButtonTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 45,
        color: colors.darkgreen
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        todaySchedule: state.todaySchedule,
        todos: state.todos,
        lastFormScheduleTime: state.lastFormScheduleTime
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doneTodo: (payload) => {
            dispatch(doneTodo(payload))
        },
        undoneTodo: (payload) => {
            dispatch(undoneTodo(payload))
        },
        unarchiveTodo: (payload) => {
            dispatch(unarchiveTodo(payload))
        },
        removeTempTodo: (payload) => {
            dispatch(removeTempTodo(payload))
        },
        deleteTodo: (payload) => {
            dispatch(deleteTodo(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive)