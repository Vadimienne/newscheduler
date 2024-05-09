export const ADD_TODO = 'ADD_TODO'
export const ADD_TEMP_TODO = 'ADD_TEMP_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const REMOVE_TEMP_TODO = 'REMOVE_TEMP_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const TAG_TODO_DONE = 'TAG_TODO_DONE'
export const TAG_TODO_SUSPENDED = 'TAG_TODO_SUSPENDED'
export const UPDATE_TODAY_SCHEDULE = 'UPDATE_TODAY_SCHEDULE'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_CURRENT_DATE = 'SET_CURRENT_DATE'
export const FORM_SCHEDULE = 'FORM_SCHEDULE'
export const SET_MORNING_NOTIFICATIONS_STATUS = 'SET_MORNING_NOTIFICATIONS_STATUS'
export const SET_EVENING_NOTIFICATIONS_STATUS = 'SET_EVENING_NOTIFICATIONS_STATUS'
export const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS'
export const RESET_STATUSES = 'RESET_STATUSES'

export function addTodo(payload){
    return {
        type: ADD_TODO,
        payload
    }
}

export function addTempTodo(payload){
    return {
        type: ADD_TEMP_TODO,
        payload
    }
}

export function removeTodo(payload){
    return {
        type: REMOVE_TODO,
        payload
    }
}

export function removeTempTodo(payload){
    return {
        type: REMOVE_TEMP_TODO,
        payload
    }
}

export function editTodo(payload){
    console.log('action invoked')
    return {
        type: EDIT_TODO,
        payload
    }
}

export function tagTodoDone(payload){
    return {
        type: TAG_TODO_DONE,
        payload
    }
}

export function changeTodoStatus(payload){
    return {
        type: CHANGE_TODO_STATUS,
        payload
    }
}

export function updateTodaySchedule(payload) {
    return {
        type: UPDATE_TODAY_SCHEDULE,
        payload
    }
}

export function setCurrentTime(payload){
    return {
        type: SET_CURRENT_TIME,
        payload
    }
}

export function setCurrentDate(payload){
    return {
        type: SET_CURRENT_DATE,
        payload
    }
}

export function formSchedule(payload){
    return {
        type: FORM_SCHEDULE,
        payload
    }
}

export function setMorningNotificationsStatus(payload){
    return {
        type: SET_MORNING_NOTIFICATIONS_STATUS,
        payload
    }
}

export function setEveningNotificationsStatus(payload){
    return {
        type: SET_EVENING_NOTIFICATIONS_STATUS,
        payload
    }
}

export function resetTodoStatuses(){
    return {
        type: RESET_STATUSES
    }
}
