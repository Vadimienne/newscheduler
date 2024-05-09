import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

function Button (props){
    const { buttonStyle, titleStyle, title, onPress } = props

    // combine external styles with in-component defaults
    let combinedButtonStyle = {}
    Object.assign(combinedButtonStyle, st.buttonStyle)
    if (Array.isArray(buttonStyle)){
        buttonStyle.map(el => Object.assign(combinedButtonStyle, el))
    }
    else{
        Object.assign(combinedButtonStyle, buttonStyle)
    }

    return(
        <TouchableOpacity 
            style={combinedButtonStyle} 
            activeOpacity={0.8}
            onPress={onPress}
            delayPressIn={0}>
            <View><Text style={titleStyle ? Object.assign({}, st.titleStyle, titleStyle) : st.titleStyle}>{title}</Text></View>
        </TouchableOpacity>
    )
}

const st = StyleSheet.create({
    buttonStyle:{
        backgroundColor: '#2e8fff',
        borderRadius: 4,
        //padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    titleStyle: {
        color: 'white'
    }
})

export default Button
