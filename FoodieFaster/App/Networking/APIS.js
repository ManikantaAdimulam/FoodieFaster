import React from 'react';

class Api {
  static logInAPI = 'users/login/';
  static otpVerifivation = 'users/verification/';
  static registration = 'users/signup/';
  static hotelList = 'hotels';
  static listOfTablesInHotel = 'hotels/tables/';
  static itemsInHotel = 'hotel/list/items/';
  static preboking = 'preboking/hotels/table';
  static orderList = 'preboking/user/table/';
  static statusApi = 'user/orderListAvilable/';
  static addOrder = 'add/orderList';
}
export default Api;