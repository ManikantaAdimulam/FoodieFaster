import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Api from '../Networking/APIS';
import request from '../Actions/ActionCreator';
import {httpMethodes} from '../Constants/Constants';
import {Actions} from 'react-native-router-flux';

class Row extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
      dataRecived: false,
    };
  }
  gotoMenu = () => {
    console.log(this.props,"prebookingorder")
    {
      this.props.is_active
        ? Actions.menu ({hotelId: this.props.hotel_id, prebookingId: this.props.id})
        : null;
    }
  };

  render () {
    return (
      <View style={styles.cell}>
        <View>
          <TouchableOpacity onPress={this.gotoMenu}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.detailsView}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  HotelName: {(typeof this.props.hotelDAta.hotelName != 'undefined') ? this.props.hotelDAta.hotelName : ''}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'gray'}}>
                  Date: {this.props.bookingDate}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'gray'}}>
                  No.of People: {this.props.numberofPeolpe}
                </Text>
                <Text>Time: {this.props.in_between}</Text>
              </View>
              <View style={styles.timeAndActive}>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: this.props.is_active ? 'green' : 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                >
                  {this.props.is_active ? 'Accepted' : 'Not accepted'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  cell: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    width: Dimensions.get ('window').width,
    backgroundColor: 'white',
  },
  detailsView: {
    paddingLeft: 15,
    width: Dimensions.get ('window').width * 0.6,
  },
  timeAndActive: {
    paddingLeft: 15,
    width: Dimensions.get ('window').width * 0.3,
  },
});
function mapStateToProps (state) {
  return {
    orders: state.ItemsReducer,
  };
}
export default connect (mapStateToProps) (Row);
