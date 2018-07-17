import {
    APIActions
} from '../Actions/APIActions';
import {
    NetworkManager
} from '../Networking/NetworkManager';
import ReduxThunk from 'redux-thunk';
import actionCreators from '../Actions/ActionCreator';

const initialState = {
    isLogin: false,
    result: []
}

export function LoginReducers(state = initialState, action) {
    switch (action.type) {
        case APIActions.Get_Data:
            return {
                ...state,
                isLogin: true,
                result: []
            }
        case APIActions.Get_Data_Success:
            return {
                ...state,
                isLogin: false,
                result: action.data
            };
        case APIActions.Get_Data_Error:
            return {
                ...state,
                isLogin: false,
                result: []
            };
        default:
            return state;
    }
}