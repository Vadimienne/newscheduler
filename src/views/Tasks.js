import React, { PureComponent } from 'react';
import { Button, View, SafeAreaView, Text, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { removeTodo } from '@src/store/actions'
import { connect } from 'react-redux'
import TaskInTaskList from '@src/components/TaskInTaskList'
import CoolButton from '@src/components/CoolButton'

import colors from '@src/config/colors'

class Tasks extends PureComponent{

    render(){
        let {deleteTodo, todos, navigation} = this.props

        let today = new Date()
        let dayNum = today.getDay()
        console.log(todos.map(el=> el.id))

        return(
            <>
                <SafeAreaView style={styles.mainContainer}>
                    <ScrollView >
                        {
                            todos.map(el => 
                                
                                    <TaskInTaskList
                                        {...el}
                                        onNavigateToEditScreen={() => navigation.navigate('EditActivity', {item: el})}
                                        key={`container-${el.id}`}
                                        onTaskDelete={() => deleteTodo({id: el.id})}
                                    />
                                
                            )
                        }
                    </ScrollView>
                    <View style={styles.addButton}>
                        <CoolButton 
                            title='Add new' 
                            buttonStyle={styles.addCoolButton} 
                            titleStyle={styles.addCoolButtonTitle} 
                            onPress={() => navigation.navigate('New Activity')}
                            isDecoratedText

                            // onPress={() => pushScheduledNotification()}
                            // onPress={() => cancelAllNotifications()}
                        />
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.lightgreen
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
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteTodo: (payload) => {
            dispatch(removeTodo(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)