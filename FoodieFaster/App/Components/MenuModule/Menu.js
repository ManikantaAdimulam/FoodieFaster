import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {MenuCell} from '../../UIElements/MenuCell';
import Api from '../../Networking/APIS';
import request from '../../Actions/ActionCreator';
import {httpMethodes} from '../../Constants/Constants';
import {connect} from 'react-redux';
import {itemsModel} from '../../ItemsData';
import PopupDialog from 'react-native-popup-dialog';

class Menu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      count: 0,
      dataSource: ds.cloneWithRows(this.props[0]),
    };
  }
  increments = (data, price) => {
    this.setState({count: this.state.count + data});
    this.props.increments(1, price);
  };
  decrements = (data, price) => {
    this.setState({count: this.state.count - data});
    this.props.decrements(1, price);
  };

  render() {
    return (
      <View
        style={{
          flex:1,
          width: Dimensions.get('window').width,
          backgroundColor: 'white',
        }}
      >
      <View style={{
          width: Dimensions.get('window').width,
          backgroundColor: 'white',
        }}>
        <ListView
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(data, sectionId, rowId) => (
            <MenuCell
              {...data}
              increment={this.increments.bind(this)}
              decrement={this.decrements.bind(this)}
            />
          )}
          renderSeparator={(sectionId, rowId) => (
            <View
              key={rowId}
              style={{height: 1, backgroundColor: 'lightgray'}}
            />
          )}
        />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    items: state.ItemsReducer,
  };
}
export default connect(mapStateToProps)(Menu);
