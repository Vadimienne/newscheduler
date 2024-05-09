export default function twoDatesAreSameDay(timestamp1, timestamp2){

    if (!timestamp1 || !timestamp2) {
        return false
    }

    const date1 = new Date(timestamp1)
    const date2 = new Date(timestamp2)

    if( date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()){
            return true
    }
    return false
}