import { ActionConst } from 'react-native-router-flux';
import React, { Component } from 'react'

const sceneReducer = (state = {}, {type, scene}) => {
    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }    
}

export default sceneReducer;