export let todos = [
    {
        id: 121,
        activityName:'Italian',
        isMentalActivity: true,
        minutesADay: 60,
        days:[0, 1, 2],
        finishDate: null
    },
    {
        id: 122,
        activityName:'Physical exercises',
        isMentalActivity: true,
        minutesADay: 10,
        days:[0, 1, 2, 3, 4, 5, 6],
        finishDate: null
    },
    {
        id: 123,
        activityName:'strenghten neck',
        isMentalActivity: true,
        minutesADay: 10,
        days:[0, 1, 2, 3, 4, 5, 6],
        finishDate: null
    },
    {
        id: 124,
        activityName:'english practice',
        isMentalActivity: true,
        minutesADay: 90,
        days:[0, 1, 2],
        finishDate: null
    },
    {
        id: 125,
        activityName:'polish app',
        isMentalActivity: true,
        minutesADay: 120,
        days:[0, 1, 2],
        finishDate: null
    },
    {
        id: 126,
        activityName:'running',
        isMentalActivity: true,
        minutesADay: 40,
        days:[ 1, 2, 4, 5, 6 ],
        finishDate: null
    },
    {
        id: 127,
        activityName:'running',
        isMentalActivity: true,
        minutesADay: 40,
        days:[ 1, 2, 4, 5, 6 ],
        finishDate: null
    },
    {
        id: 129,
        activityName:'running',
        isMentalActivity: true,
        minutesADay: 40,
        days:[ 1, 2, 4, 5, 6 ],
        finishDate: null
    },
    {
        id: 120,
        activityName:'running',
        isMentalActivity: true,
        minutesADay: 40,
        days:[ 1, 2, 4, 5, 6 ],
        finishDate: null
    },{
        id: 135,
        activityName:'running',
        isMentalActivity: true,
        minutesADay: 40,
        days:[ 1, 2, 4, 5, 6 ],
        finishDate: null
    }
]

export function addTodo(newTodo){
    todos.push(newTodo)
}