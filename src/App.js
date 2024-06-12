import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '@src/views/Home'
import Tasks from '@src/views/Tasks'
import NewActivity from '@src/views/NewActivity'
import NewTempActivity from '@src/views/NewTempActivity'
import EditActivity from '@src/views/EditActivity'
import ActivityDashboard from '@src/views/ActivityDashboard'

import PushNotification from 'react-native-push-notification'
import { 
    setMorningNotificationsStatus,
    setEveningNotificationsStatus,
    setCurrentDate,
    setCurrentTime,
    formSchedule,
    resetTodoStatuses
} from '@src/store/actions';
import { 
    defaultMorningNotificationLiteral,
    defaultEveningNotificationLiteral
} from '@src/stringLiterals'
import config from '@src/config'
import twoDatesAreSameDay from './helpers/twoDatesAreSameDay';
import setTimestampToStartOfDay from './helpers/setTimestampToStartOfDay';
const { notificationChannelId } = config

import colors from '@src/config/colors'


let MaterialTopTabs = createMaterialTopTabNavigator()
let RootStack = createStackNavigator()

function MainScreen(){

    
    return(
        <MaterialTopTabs.Navigator sceneContainerStyle={{
             backgroundColor: colors.darkgreen ,
          }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold',  },
            tabBarItemStyle: { backgroundColor: colors.lightgreen },
            tabBarStyle: { backgroundColor: colors.darkgreen }
            }}
          >
            <MaterialTopTabs.Screen
                name="Schedule"
                component={Home}
                options={{ title: 'Today Schedule' }}
                swipeEnabled
            />
            <MaterialTopTabs.Screen
                name="Tasks"
                component={Tasks}
                options={{ title: 'All Activities' }}
            />
        </MaterialTopTabs.Navigator>
    )
}

function App (props) {

    const {
        morningNotificationsAreSet,
        eveningNotificationsAreSet,
        currentTime,
        currentDate,
        todos,
        tempTodos,
        updateCurrentDate,
        updateCurrentTime,
        lastFormScheduleTime, 
        initializeTodaySchedule,
        resetTodoStatuses,
        setMorningNotificationsStatus,
        setEveningNotificationsStatus
    } = props

    useEffect(() => {
        updateCurrentTime(Date.now())
    }, [])

    // Initialize new schedule if new day started

    useEffect(() => {
        if( !twoDatesAreSameDay(lastFormScheduleTime, Date.now()) ){
            // reset statuses because they are stored in todos, not todaySchedule.
            // it is so because when we delete a task, the schedule is reformed thus todaySchedule is new every time we do that
            resetTodoStatuses()
            initializeTodaySchedule()
        }
    })

    // Update schedule if todos changed
    useEffect(() => {
        initializeTodaySchedule()
    }, [todos, tempTodos])

    

    // Update time and date effect

    useEffect(() => {
        const interval = setInterval(() => {
            let now = Date.now()
            if(!twoDatesAreSameDay(currentDate, now)){
                updateCurrentDate(setTimestampToStartOfDay(now))
            }
            updateCurrentTime(now)
        }, 1000)
        return () => clearInterval(interval)
    })

    // Set notifications for 
    useEffect(() => {
        const startOfDay = setTimestampToStartOfDay(Date.now())
        console.log('morning notifications are set:', morningNotificationsAreSet)
        console.log('evening notifications are set:', eveningNotificationsAreSet)
        // PushNotification.cancelAllLocalNotifications()

        if (!morningNotificationsAreSet){
            // Morning notification at 8 AM
            PushNotification.localNotificationSchedule({
                channelId: notificationChannelId,
                title: 'Push me',
                message: `to see todays tasks`, // (required)
                date: new Date(startOfDay + 1000 * 60 * 60 * 8), 
                allowWhileIdle: true,
                repeatType: 'day',
                importance: 'high',
                priority: 'high',
                ignoreInForeground: false,
            });
            setMorningNotificationsStatus(true)
        }

        if (!eveningNotificationsAreSet){
            // Evening notification at 6 PM
            PushNotification.localNotificationSchedule({
                channelId: notificationChannelId,
                title: 'Push me',
                message: `to finish tasks`, // (required)
                date: new Date(startOfDay + 1000 * 60 * 60 * 18), 
                allowWhileIdle: true,
                repeatType: 'day'
            });
            setEveningNotificationsStatus(true)
        }
    }, [currentDate, morningNotificationsAreSet, eveningNotificationsAreSet])

    // useEffect(() => {
    //     PushNotification.getScheduledLocalNotifications((arr) => {
    //         if (!arr.length){
    //             setMorningNotificationsStatus(false)
    //             setEveningNotificationsStatus(false)
    //         }
    //     })
    // }, [currentDate])

    return(
        <RootStack.Navigator screenOptions={{ cardStyle: {backgroundColor: '#fff'}}}>
            <RootStack.Screen 
                name='MainScreen' 
                component={MainScreen}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen name='New Activity' component={NewActivity} 
                options={{
                    title: 'Activity Dashboard', 
                    headerStyle: {backgroundColor: colors.lightgreen},
                    headerTitleStyle: {color: colors.darkgreen}
                }}
            />
            <RootStack.Screen name='NewTempActivity' component={NewTempActivity} 
                options={{
                    title: 'New Quick Task', 
                    headerStyle: {backgroundColor: colors.lightgreen},
                    headerTitleStyle: {color: colors.darkgreen}
                }}
            />
            <RootStack.Screen name='EditActivity' component={EditActivity}
                options={{
                    title: 'Activity Edit', 
                    headerStyle: {backgroundColor: colors.lightgreen},
                    headerTitleStyle: {color: colors.darkgreen}
                }}
            />
            <RootStack.Screen name='ActivityDashboard' component={ActivityDashboard} 
                options={{
                    title: 'Activity Dashboard', 
                    headerStyle: {backgroundColor: colors.lightgreen},
                    headerTitleStyle: {color: colors.darkgreen}
                }}
                />
        </RootStack.Navigator>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        morningNotificationsAreSet: state.morningNotificationsAreSet,
        eveningNotificationsAreSet: state.eveningNotificationsAreSet,
        currentTime: state.currentTime,
        currentDate: state.currentDate,
        todos: state.todos,
        tempTodos: state.tempTodos,
        lastFormScheduleTime: state.lastFormScheduleTime
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setMorningNotificationsStatus: (payload) => {
            dispatch(setMorningNotificationsStatus(payload))
        },
        setEveningNotificationsStatus: (payload) => {
            dispatch(setEveningNotificationsStatus(payload))
        },
        updateCurrentTime: (payload) => {
            dispatch(setCurrentTime(payload))
        },
        updateCurrentDate: (payload) => {
            dispatch(setCurrentDate(payload))
        },
        initializeTodaySchedule: () => {
            dispatch(formSchedule())
        },
        resetTodoStatuses: () => {
            dispatch(resetTodoStatuses())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)