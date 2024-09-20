import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'

function Button (props){
    const { buttonStyle, titleStyle, title, onPress, isDecoratedText, decorationOffset } = props

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
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {isDecoratedText? <View style={st.decorationImg}>
                    <Image 
                        source={require('../assets/icons/btnDecoration.png')}
                        style={{...st.decorationImg,
                            top: 5,
                        }}
                    />
                </View>: <></>}
                <Text style={titleStyle ? Object.assign({}, st.titleStyle, titleStyle) : st.titleStyle}>{title}</Text>
                {isDecoratedText? <View>
                    <Image 
                        source={require('../assets/icons/btnDecorationFlipped.png')}
                        style={{...st.decorationImg,
                            top: 26,
                        }}
                    />
                </View>: <></>}
                </View>
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
    },
    decorationImg: {
        width: 13,
        height: 13,
        resizeMode: 'contain',
        position:'relative'
    },
})

export default Button
