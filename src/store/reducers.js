import {
    ADD_TODO,
    ADD_TEMP_TODO,
    FORM_SCHEDULE,
    REMOVE_TODO,
    REMOVE_TEMP_TODO,
    EDIT_TODO,
    TAG_TODO_DONE,
    CHANGE_TODO_STATUS,
    SET_CURRENT_TIME,
    SET_CURRENT_DATE,
    UPDATE_TODAY_SCHEDULE,
    SET_MORNING_NOTIFICATIONS_STATUS,
    SET_EVENING_NOTIFICATIONS_STATUS,
    RESET_STATUSES
} from './actions'

import { formSchedule } from './formSchedule'
import setTimestampToStartOfDay from '@src/helpers/setTimestampToStartOfDay'

import {todoActiveLtrl} from '@src/stringLiterals'

const initialState = {
    todos: [],
    tempTodos: [],
    todaySchedule: [],
    currentTime: null,
    lastFormScheduleTime: null,
    morningNotificationsAreSet: false,
    eveningNotificationsAreSet: false
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        // here we update todaySchedule when activity is added or removed
        // It would be nice to: 
        // unify updates of todaySchedule. Maybe add a listener.
        // 
        // And we assign sortableId for Todo to work in sortable container.
        // Should unify that too
        case ADD_TODO:
            return {
                ...state, 
                todos: [
                    ...state.todos, 
                    action.payload
                ]
            }

        case ADD_TEMP_TODO: 
            const newTempTodo = Object.assign({}, action.payload, {isTemporal: true})
            return {
                ...state,
                tempTodos: [
                    ...state.tempTodos,
                    newTempTodo
                ]
            }

        case REMOVE_TEMP_TODO: 
            const newTempTodos = state.tempTodos.filter(el => el.id != action.payload.id)
            return {
                ...state,
                tempTodos: newTempTodos
            }

        case REMOVE_TODO:
            const newTodos = state.todos.filter(el => el.id != action.payload.id)
            return {
                ...state,
                todos: newTodos
            }

        case EDIT_TODO: 
            console.log('edit invoked: ', action.payload)
            console.log('state: ', state)
            let todosCopy = JSON.parse(JSON.stringify(state.todos))
            let data = action.payload
            let editedIndex = todosCopy.findIndex(el => el.id == data.id)
            console.log('edittedIndex',editedIndex)
            todosCopy[editedIndex] = data
            return{
                ...state,
                todos: [...todosCopy]
            }
        
        // Now it just removes todo from todaySchedule
        // Maybe I should create another list of done and suspended tasks
        case TAG_TODO_DONE:
            let doneTodoIndex = state.todaySchedule.findIndex(el => el.id == action.payload.id)
            let doneTodoCopy = JSON.parse(JSON.stringify(state.todaySchedule[doneTodoIndex]))
            doneTodoCopy.isDone = true
            const updatedSchedule = state.todaySchedule[doneTodoIndex] = doneTodoCopy
            return {
                ...state,
                todaySchedule: updatedSchedule
            }

        case CHANGE_TODO_STATUS:
            // let todoIndex = state.todaySchedule.findIndex(el => el.id == action.payload.id)
            // let todoCopy = JSON.parse(JSON.stringify(state.todaySchedule[todoIndex]))
            // todoCopy.status = action.payload.status
            // let scheduleCopy = JSON.parse(JSON.stringify(state.todaySchedule))

            let todoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let todoCopy = JSON.parse(JSON.stringify(state.todos[todoIndex]))
            todoCopy.status = action.payload.status
            let todosListCopy = JSON.parse(JSON.stringify(state.todos))
            todosListCopy[todoIndex] = todoCopy 
            return {
                ...state,
                //todaySchedule: scheduleCopy
                todos: todosListCopy
            }

        case UPDATE_TODAY_SCHEDULE:
            return {
                ...state,
                todaySchedule: action.payload
            }

        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            }
        case SET_CURRENT_DATE:
            return {
                ...state,
                currentDate: setTimestampToStartOfDay(action.payload)
            }

        case RESET_STATUSES: 
            let todosCopy1 = JSON.parse(JSON.stringify(state.todos))
            todosCopy1 = todosCopy1.map(el => Object.assign({}, el, {status: todoActiveLtrl}))
            return {
                ...state,
                todos: todosCopy1
            }

        case FORM_SCHEDULE:
            const schedule = formSchedule(state.todos, state.tempTodos)
            return {
                ...state,
                todaySchedule: schedule,
                lastFormScheduleTime: Date.now()
            }

        case SET_MORNING_NOTIFICATIONS_STATUS:
            return {
                ...state,
                morningNotificationsAreSet: action.payload
            }
        
        case SET_EVENING_NOTIFICATIONS_STATUS:
            return {
                ...state,
                eveningNotificationsAreSet: action.payload
            }

        default:
            return state
    }
}