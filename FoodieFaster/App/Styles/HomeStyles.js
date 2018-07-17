import {
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import React, {
    Component
} from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    button: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: Dimensions.get('window').height * 0.35,
        width: Dimensions.get('window').width * 0.9
    },

})

export default styles;