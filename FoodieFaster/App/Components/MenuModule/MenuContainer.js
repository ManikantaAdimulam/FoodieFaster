import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import styles from '../../Styles/LoginStyles';
import Menu from '../MenuModule/Menu';
import {connect} from 'react-redux';
import Api from '../../Networking/APIS';
import request from '../../Actions/ActionCreator';
import {httpMethodes} from '../../Constants/Constants';
import {itemsModel} from '../../ItemsData';
import {Actions} from 'react-native-router-flux';


var item = [];
class MenuContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(request(Api.itemsInHotel+this.props.hotelId, httpMethodes.get)).then(response => {
      if (response.ok) {
        item = itemsModel(this.props.items);
        this.setState({dataRecived: true});
      } else {
        console.log('error');
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      totalPrice: 0,
      selectedItems: [],
      itemCount: [],
      dataRecived: false
    };
  }

  inccounter(d, item) {
    this.setState({
      count: this.state.count + d,
      totalPrice: this.state.totalPrice + item.price,
    });
    if (this.containsObject(item, this.state.selectedItems)) {
      let index = this.state.selectedItems.indexOf(item)
      this.state.itemCount[index] = this.state.itemCount[index]+1
      console.log(index, this.state.itemCount[index])
    } else {
      this.state.selectedItems.push(item)
      this.state.itemCount.push(1)
    }
  }
  deccounter(d, item) {
    this.setState({
      count: this.state.count - d,
      totalPrice: this.state.totalPrice - item.price,
    });
    let index = this.state.selectedItems.indexOf(item);
    this.state.selectedItems.splice(index, 1);
  }
 containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}
  onClickViewCart = () => {
    var arr=JSON.parse(JSON.stringify(this.state.selectedItems));
    for (i=0; i<arr.length; i++) {
      arr[i].quantity= this.state.itemCount[i]
    }
    this.setState({selectedItems: arr})
    Actions.editOrders({selectedItems: arr, totalPrice: this.state.totalPrice, hotelId: this.props.hotelId, prebookingId: this.props.prebookingId});
    // Actions.menu()
  };
  render() {
    const {vegItems} = this.state;
    const {nonVeg} = this.state;
    if (this.state.dataRecived) {
      return (
        <View
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: '#FFC538',
          }}
        >
          <ScrollableTabView
            backgroundColor="#FFC538"
            tabBarActiveTextColor="white"
            tabBarPosition="top"
            renderTabBar={() => (
              <TabBar
                tabStyles={(tab = {backgroundColor: 'red'})}
                tabBarTextStyle={{
                  width: Dimensions.get('window').width * 0.4,
                  textAlign: 'center',
                }}
                backgroundColor="#FFC538"
                paddingTop={0}
                underlineColor="white"
                tabMargin={0}
              />
            )}
          >
            <Menu
              {...[item.veg]}
              tabLabel={{label: 'Veg'}}
              increments={this.inccounter.bind(this)}
              decrements={this.deccounter.bind(this)}
            />

            <Menu
              {...[item.NonVeg]}
              tabLabel={{label: 'Non-Veg'}}
              increments={this.inccounter.bind(this)}
              decrements={this.deccounter.bind(this)}
            />
          </ScrollableTabView>
          {this.state.count > 0 ? (
            <View
              style={{
                height: 50,
                backgroundColor: 'black',
                width: Dimensions.get('window').width,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  height: 49,
                  backgroundColor: 'white',
                  width: Dimensions.get('window').width * 0.7,
                }}
              >
                <View
                  style={{
                    height: 49,
                    backgroundColor: 'white',
                    width: Dimensions.get('window').width * 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>
                    {this.state.count} items in cart : ₹{this.state.totalPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 49.5,
                  backgroundColor: 'black',
                  width: Dimensions.get('window').width * 0.3,
                }}
              >
                <TouchableOpacity onPress={this.onClickViewCart}>
                  <View
                    style={{
                      height: 49,
                      backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{color: 'white'}}>View Cart</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
           
      );
    } else {
      return(
      <View />);
    }
  }
}

const styless = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  text: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#FFC538',
    fontSize: 32,
  },
});
function mapStateToProps(state) {
  return {
    items: state.ItemsReducer,
  };
}

export default connect(mapStateToProps)(MenuContainer);
