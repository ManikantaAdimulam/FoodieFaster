import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import EditOrdersCell from '../../UIElements/EditOrdersCell';
import {connect} from 'react-redux';
import request from '../../Actions/ActionCreator';
import Api from '../../Networking/APIS';
import {httpMethodes} from '../../Constants/Constants';
import {Actions} from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
import {PacmanIndicator} from 'react-native-indicators';

var item = [];
var user = '';
var hotel = '';
class EditOrders extends Component {
  constructor (props) {
    super (props);
    const ds = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log (this.props.selectedItems);
    this.state = {
      count: 0,
      dataSource: ds.cloneWithRows (this.props.selectedItems),
      visible: false,
    };
  }
  componentWillMount () {
    this.params ();
  }
  increments = (data, price) => {
    this.setState ({count: this.state.count + data});
  };
  decrements = (data, price) => {
    this.setState ({count: this.state.count - data});
  };
  componentWillReceiveProps () {
    console.log (this.props);
  }
  goToStatus () {
    Actions.status ({hotelId: this.props.hotelId});
  }
  async params () {
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    user = data.id;
    hotel = this.props.hotelId;
  }
  apiCall = () => {
    this.setState ({visible: true});
    {
      this.state.visible
        ? this.popupDialog.dismiss ()
        : this.popupDialog.show ();
    }
    const {dispatch} = this.props;
    let params = {
      user_id: user,
      hotel_id: this.props.hotelId,
      totalItemsList: this.props.selectedItems,
      price: this.props.totalPrice + 120,
      prebookingId: this.props.prebookingId,
    };
    dispatch (
      request (Api.addOrder, httpMethodes.post, params)
    ).then (response => {
      this.setState ({visible: false});

      if (response.ok) {
        this.goToStatus ();
      } else {
      }
    });
  };
  render () {
    return (
      <View
        style={{
          width: Dimensions.get ('window').width,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            showsVerticalScrollIndicator={false}
            renderRow={(data, sectionId, rowId) => (
              <EditOrdersCell
                {...data}
                increment={this.increments.bind (this)}
                decrement={this.decrements.bind (this)}
              />
            )}
            renderSeparator={(sectionId, rowId) => (
              <View
                key={rowId}
                style={{height: 1, backgroundColor: 'lightgray'}}
              />
            )}
          />
          <View>
            <View
              style={{
                height: 60,
                width: Dimensions.get ('window').width,
                borderWidth: 0.5,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  width: Dimensions.get ('window').width * 0.95,
                  justifyContent: 'space-between',
                }}
              >
                <Text>Total</Text>
                <Text>₹{this.props.totalPrice}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  width: Dimensions.get ('window').width * 0.95,
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}
              >
                <Text>Tax</Text>
                <Text>₹120</Text>
              </View>
            </View>
            <View
              style={{
                height: 44,
                width: Dimensions.get ('window').width,
                backgroundColor: 'black',
              }}
            >
              <TouchableOpacity onPress={this.apiCall}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: 15,
                  }}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Confirm order
                  </Text>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    ₹{this.props.totalPrice + 120}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          height={Dimensions.get ('window').height * 0.1}
          width={Dimensions.get ('window').width * 0.2}
        >
          <PacmanIndicator color="black" />
        </PopupDialog>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    orders: state.LoginReducers,
  };
}
export default connect (mapStateToProps) (EditOrders);
