function minutesToHours(minutes) {
    let mins = minutes % 60
    let hours = Math.floor(minutes /60 )
    return {minutes: mins, hours}
}

export default minutesToHours