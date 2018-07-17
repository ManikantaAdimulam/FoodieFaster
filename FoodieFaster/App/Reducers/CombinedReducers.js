import { combineReducers } from 'redux';
import { LoginReducers } from './LoginReducer';
import  sceneReducer  from './ScreenReducer';
import { ItemsReducer } from './itemsReducer';
import {ordersReducers} from './OredersListReducer'
import {HotelsList} from './HotelsListReducer';

export function rootReducer() {
  return combineReducers({
    LoginReducers,
    sceneReducer,
    ItemsReducer,
    ordersReducers,
    HotelsList,
  });
}