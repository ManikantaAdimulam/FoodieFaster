import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import Row from '../../UIElements/MyOrdersRow';
import {connect} from 'react-redux';
import request from '../../Actions/ActionCreator';
import Api from '../../Networking/APIS';
import {httpMethodes} from '../../Constants/Constants';
import PopupDialog from 'react-native-popup-dialog';
import {PacmanIndicator} from 'react-native-indicators';

var ds;
class TabBar extends Component {
   componentWillMount () {
   this.apiCall()
  }

  async apiCall() {
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    let api = Api.orderList + data.id;
    const {dispatch} = this.props;
    dispatch (request (api, httpMethodes.get)).then (response => {
      console.log (response);
      this.setState ({refreshing: false});
      if (response.ok) {
        this.setState ({
          dataSource: ds.cloneWithRows (this.props.orders.result.Data),
        });
      } else {
        console.log ('error');
      }
    });
  }
  constructor (props) {
    super (props);
    ds = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows ([]),
      show: false,
      refreshing: false,
    };
  }
  _onRefresh () {
    this.setState ({refreshing: true});
    this.apiCall()
  }
  render () {
    if (this.props.orders.getResult) {
      return (
        <View
          style={{
            height: Dimensions.get ('window').height,
            backgroundColor: 'white',
          }}
        >
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind (this)}
              />
            }
            showsVerticalScrollIndicator={false}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={data => <Row {...data} />}
            renderSeparator={(sectionId, rowId) => (
              <View key={rowId} style={{height: 1, backgroundColor: 'gray'}} />
            )}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }
}

function mapStateToProps (state) {
  return {
    orders: state.ordersReducers,
  };
}
export default connect (mapStateToProps) (TabBar);
