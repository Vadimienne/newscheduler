export default function(timestamp){
    let date = new Date(timestamp)
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    return new Date(`${year}-${month}-${day}`).setHours(0,0,0,0)
}