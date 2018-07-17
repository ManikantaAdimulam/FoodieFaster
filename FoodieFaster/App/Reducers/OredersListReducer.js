import {
    APIActions
} from '../Actions/APIActions';
import {
    NetworkManager
} from '../Networking/NetworkManager';
import ReduxThunk from 'redux-thunk';
import actionCreators from '../Actions/ActionCreator';

const initialState = {
    getResult: false,
    result: []
}

export function ordersReducers(state = initialState, action) {
    switch (action.type) {
        case APIActions.Get_Data:
            return {
                ...state,
                getResult: false,
                result: []
            }
        case APIActions.Get_Data_Success:
            return {
                ...state,
                getResult: true,
                result: action.data
            };
        case APIActions.Get_Data_Error:
            return {
                ...state,
                getResult: false,
                result: []
            };
        default:
            return state;
    }
}