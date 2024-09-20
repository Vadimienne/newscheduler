import {
    ADD_TODO,
    ARCHIVE_TODO,
    UNARCHIVE_TODO,
    DONE_TODO,
    UNDONE_TODO,
    ADD_TODO_NOTE,
    DELETE_TODO_NOTE,
    DELETE_TODO,
    CHANGE_TODO,
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
    // tempTodos: [],
    // todaySchedule: [],
    // currentTime: null,
    // lastFormScheduleTime: null,
    // morningNotificationsAreSet: false,
    // eveningNotificationsAreSet: false
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        // here we update todaySchedule when activity is added or removed
        // It would be nice to: 
        // unify updates of todaySchedule. Maybe add a listener.
        // 
        // And we assign sortableId for Todo to work in sortable container.
        // Should unify that too
        // case ADD_TODO:
        //     return {
        //         ...state, 
        //         todos: [
        //             ...state.todos, 
        //             action.payload
        //         ]
        //     }

        case ADD_TODO: 
            const newTodo = Object.assign({}, action.payload)
            return {
                ...state,
                todos: [
                    ...state.todos,
                    newTodo
                ]
            }

        case ADD_TODO_NOTE: 
            let todoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let todoCopy = JSON.parse(JSON.stringify(state.todos[todoIndex]))
            todoCopy.notes.push({text: action.payload.text, id: Date.now()})

            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[todoIndex] = todoCopy
            
            return {
                ...state,
                todos: todosCopy
            }

        case DELETE_TODO_NOTE: 
            todoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            todoCopy = JSON.parse(JSON.stringify(state.todos[todoIndex]))
            // todoCopy.notes.push({text: action.payload.note, id: Date.now()})
            todoCopy.notes = todoCopy.notes.filter(el => el.id != action.payload.noteId)

            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[todoIndex] = todoCopy
            
            return {
                ...state,
                todos: todosCopy
            }

        case ARCHIVE_TODO:
            let archTodoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let archTodoCopy = JSON.parse(JSON.stringify(state.todos[archTodoIndex]))
            archTodoCopy.isArchived = true
            
            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[archTodoIndex] = archTodoCopy
            return {
                ...state,
                todos: todosCopy
            }    

        case UNARCHIVE_TODO:
            let unarchTodoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let unarchTodoCopy = JSON.parse(JSON.stringify(state.todos[unarchTodoIndex]))
            unarchTodoCopy.isArchived = false
            unarchTodoCopy.isDone = false
            
            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[unarchTodoIndex] = unarchTodoCopy
            return {
                ...state,
                todos: todosCopy
            }    

        case DONE_TODO:
            let doneTodoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let doneTodoCopy = JSON.parse(JSON.stringify(state.todos[doneTodoIndex]))
            doneTodoCopy.isDone = true

            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[doneTodoIndex] = doneTodoCopy
            return {
                ...state,
                todos: todosCopy
            }   

        case UNDONE_TODO:
            let undoneTodoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            let undoneTodoCopy = JSON.parse(JSON.stringify(state.todos[undoneTodoIndex]))
            undoneTodoCopy.isDone = false

            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy[undoneTodoIndex] = undoneTodoCopy
            return {
                ...state,
                todos: todosCopy
            }   

            
        case DELETE_TODO:
            //let delTodoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            //console.log('IDDDD', action.payload.id)
            let todosCopy = JSON.parse(JSON.stringify(state.todos))
            todosCopy =  todosCopy.filter(el => el.id != action.payload.id)
            return {
                ...state,
                todos: todosCopy
            }    

        case CHANGE_TODO:
            todosCopy = JSON.parse(JSON.stringify(state.todos))
            todoIndex = state.todos.findIndex(el => el.id == action.payload.id)
            todosCopy[todoIndex] = action.payload.todo
            return {
                ...state,
                todos: todosCopy
            }   
        

        // case TAG_TODO_DONE:
        //     let doneTodoIndex = state.todaySchedule.findIndex(el => el.id == action.payload.id)
        //     let doneTodoCopy = JSON.parse(JSON.stringify(state.todaySchedule[doneTodoIndex]))
        //     doneTodoCopy.isDone = true
        //     const updatedSchedule = state.todaySchedule[doneTodoIndex] = doneTodoCopy
        //     return {
        //         ...state,
        //         todaySchedule: updatedSchedule
        //     }

        // case REMOVE_TEMP_TODO: 
        //     const newTempTodos = state.tempTodos.filter(el => el.id != action.payload.id)
        //     return {
        //         ...state,
        //         tempTodos: newTempTodos
        //     }

        // case REMOVE_TODO:
        //     const newTodos = state.todos.filter(el => el.id != action.payload.id)
        //     return {
        //         ...state,
        //         todos: newTodos
        //     }

        // case EDIT_TODO: 
            
        //     let todosCopy = JSON.parse(JSON.stringify(state.todos))
        //     let data = action.payload
        //     let editedIndex = todosCopy.findIndex(el => el.id == data.id)
        //     todosCopy[editedIndex] = data
        //     return{
        //         ...state,
        //         todos: [...todosCopy]
        //     }
        
        // // Now it just removes todo from todaySchedule
        // // Maybe I should create another list of done and suspended tasks
        // case TAG_TODO_DONE:
        //     let doneTodoIndex = state.todaySchedule.findIndex(el => el.id == action.payload.id)
        //     let doneTodoCopy = JSON.parse(JSON.stringify(state.todaySchedule[doneTodoIndex]))
        //     doneTodoCopy.isDone = true
        //     const updatedSchedule = state.todaySchedule[doneTodoIndex] = doneTodoCopy
        //     return {
        //         ...state,
        //         todaySchedule: updatedSchedule
        //     }

        // case CHANGE_TODO_STATUS:
        //     // let todoIndex = state.todaySchedule.findIndex(el => el.id == action.payload.id)
        //     // let todoCopy = JSON.parse(JSON.stringify(state.todaySchedule[todoIndex]))
        //     // todoCopy.status = action.payload.status
        //     // let scheduleCopy = JSON.parse(JSON.stringify(state.todaySchedule))

        //     let todoIndex = state.todos.findIndex(el => el.id == action.payload.id)
        //     let todoCopy = JSON.parse(JSON.stringify(state.todos[todoIndex]))
        //     todoCopy.status = action.payload.status
        //     let todosListCopy = JSON.parse(JSON.stringify(state.todos))
        //     todosListCopy[todoIndex] = todoCopy 
        //     return {
        //         ...state,
        //         //todaySchedule: scheduleCopy
        //         todos: todosListCopy
        //     }

        // case UPDATE_TODAY_SCHEDULE:
        //     return {
        //         ...state,
        //         todaySchedule: action.payload
        //     }

        // case SET_CURRENT_TIME:
        //     return {
        //         ...state,
        //         currentTime: action.payload
        //     }
        // case SET_CURRENT_DATE:
        //     return {
        //         ...state,
        //         currentDate: setTimestampToStartOfDay(action.payload)
        //     }

        // case RESET_STATUSES: 
        //     let todosCopy1 = JSON.parse(JSON.stringify(state.todos))
        //     todosCopy1 = todosCopy1.map(el => Object.assign({}, el, {status: todoActiveLtrl}))
        //     return {
        //         ...state,
        //         todos: todosCopy1
        //     }

        // case FORM_SCHEDULE:
        //     const schedule = formSchedule(state.todos, state.tempTodos)
        //     return {
        //         ...state,
        //         todaySchedule: schedule,
        //         lastFormScheduleTime: Date.now()
        //     }

        // case SET_MORNING_NOTIFICATIONS_STATUS:
        //     return {
        //         ...state,
        //         morningNotificationsAreSet: action.payload
        //     }
        
        // case SET_EVENING_NOTIFICATIONS_STATUS:
        //     return {
        //         ...state,
        //         eveningNotificationsAreSet: action.payload
        //     }

        default:
            return state
    }
}