import {
    APIActions
} from './APIActions';
import {
    NetworkManager
} from '../Networking/NetworkManager';
import Api from '../Networking/APIS';
import {httpMethodes} from '../Constants/Constants';

export const actionCreators = {
    getData: () => {
        return {
            type: APIActions.Get_Data
        }
    },
    getDataSuccess: (data) => {
        return {
            type: APIActions.Get_Data_Success,
            data
        }
    },
    getDataFailure: () => {
        return {
            type: APIActions.Get_Data_Error,
        }
    }
}

export default function request(url, httpMethode: httpMethodes, parameters) {
    return (dispatch) => {
        dispatch(actionCreators.getData())
        return NetworkManager.request(url, httpMethode, parameters).then((response) => {
            if (response.ok) {
                dispatch(actionCreators.getDataSuccess(response.data))
            } else {
                dispatch(actionCreators.getDataFailure())
            }
            return response
        })
    }

}