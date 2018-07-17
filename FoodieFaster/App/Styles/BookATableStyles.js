import React,{ Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    style_row_view: {
        flex: 1,
        flexDirection: 'row',
        height: 57,
        backgroundColor: '#FFFFFF',
    },
    style_text: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333333',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white'
    },
    button: {
        marginTop: 44,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.8
    },
    header: {
        marginTop:10,
        width: Dimensions.get('window').width * 0.82,
        color: 'gray'
    },
    headerText: {
        color: 'lightgray',
    },
    dropdownTextStyle: {
        color: 'brown',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft:10,
        margin: 1,
    },
    dropdownStyle: {
        width: '82%',
        marginTop: 8,
        borderWidth: 2, 
    },
    image: {
        height: 30,
        width: 30
    },
    dropdownFeild: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: Dimensions.get('window').width * 0.75,
        height: 30,
        justifyContent: 'center',
    },

    bgView: {
        width: Dimensions.get('window').width * 0.82,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: 0,
        borderBottomWidth: 0.5,
        borderColor: 'black',        
    }
});

export default styles;