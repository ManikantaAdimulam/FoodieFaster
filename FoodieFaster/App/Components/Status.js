import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import SocketIOClient from 'socket.io-client';
import {connect} from 'react-redux';
import request from '../Actions/ActionCreator';
import Api from '../Networking/APIS';
import {httpMethodes} from '../Constants/Constants';
import PopupDialog from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';

var tk = {
  mobileNo: '9502185551',
};
var des = '';
var user = {};

class Status extends Component {
  componentWillMount () {
    this.getData ();
    this.onConnect ();
  }
  async getData () {
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    user = data;
  }
  onConnect () {
    console.log ('onConnect-status', user);
    const {dispatch} = this.props;
    let api = Api.statusApi + user.id;
    dispatch (request (api, httpMethodes.get))
      .then (response => {
        console.log (response);
        this.setState ({status: response.data.data});
        if (typeof response.data.order != 'undefined') {
          this.setState ({orderId: response.data.order.id});
        }
      })
      .catch (error => {
        console.log (error);
      });
  }
  componentDidMount () {
    this.socket ();
  }
  alert = () => {
    Alert.alert ('Success');
  };
  constructor (props) {
    super (props);
    this.state = {
      description: 'Your order is accepted',
      time: '',
      tk: '',
      status: '',
      orderId: '',
      starCount: 0,
    };
  }
  socket () {
    this.socket = SocketIOClient ('http://192.168.1.206:4004');
    try {
      this.socket.emit ('data', tk);
      console.log ('hiiii', tk);
    } catch (error) {
      console.log (error + 'tk');
    }
    try {
      this.socket.on ('status', data => {
        this.setState ({time: data.time, description: data.description});
        des = data.des;
      });
      this.socket.on ('orderCompleted', data => {
        this.setState ({status: 'inactive'});
        des = data.des;
      });
      this.socket.on ('orderupdated', data => {
        console.log ('status' + data);
        this.setState ({status: 'active'});
      });
    } catch (error) {
      console.log (error + 'tk');
    }
  }
  gotoMenu = () => {
    Actions.menu ({hotelId: this.props.hotelId});
  };
  render () {
    if (this.state.status == 'inactive' || this.state.status == '') {
      return (
        <View
          style={{
            flex: 1,
            width: Dimensions.get ('window').width,
            height: Dimensions.get ('window').height,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{textAlign: 'center'}}>No active orders</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            width: Dimensions.get ('window').width,
            height: Dimensions.get ('window').height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <PopupDialog
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
            height={Dimensions.get ('window').height * 0.1}
            width={Dimensions.get ('window').width * 0.2}
          >
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            >
              <StarRating
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress (rating)}
              />
            </View>
          </PopupDialog>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get ('window').width * 0.5,
            }}
          >
            <Image
              style={{
                width: Dimensions.get ('window').width * 0.4,
                height: Dimensions.get ('window').height * 0.5,
                resizeMode: Image.resizeMode.center,
              }}
              source={require ('../Images/TableImages/success.png')}
            />
          </View>
          <View
            style={{
              width: Dimensions.get ('window').width,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                width: Dimensions.get ('window').width * 0.6,
                height: Dimensions.get ('window').height * 0.1,
                fontSize: 16,
                fontWeight: '200',
                textAlign: 'center',
              }}
            >
              {this.state.description}
            </Text>
            <TouchableOpacity onPress={this.gotoMenu}>
              <View
                style={{
                  width: Dimensions.get ('window').width * 0.4,
                  height: 44,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 22,
                  borderWidth: 1,
                }}
              >
                <Text style={{color: 'white'}}>Book More</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.alert}>
              <View
                style={{
                  width: Dimensions.get ('window').width * 0.4,
                  height: 44,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 22,
                  margin: 4,
                }}
              >
                <Text style={{color: 'white'}}>Pay Online</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
export default connect () (Status);
