import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

export default class EditOrdersCell extends Component {
  constructor(props) {
    super(props);
        this.state = {
      count: 0,
      selectedRow: [],
      totalCount: 0,
    };
    this.increment.bind(this);
  }
  componentWillMount() {
    this.setState({count: this.props.quantity})
  }
    increment = () => {
      this.setState({count: this.state.count + 1}), this.props.increment(1,this.props);
    };
    decrement = () => {
      if (this.state.count > 0) {
        this.setState({count: this.state.count - 1});
        this.props.decrement(1,this.props);
      }
    };
    
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <View style={{width: '85%'}}>
          <Text style={{margin: 4, color: 'black', fontWeight: 'bold'}}>{this.props.item_name}</Text>
          <Text style={{margin: 4, color: 'gray'}}>{this.props.description}</Text>
          <View style={{flexDirection: 'row'}}>

            <Text style={{margin: 4, textAlign: 'center', alignSelf: 'center'}}>
              {this.state.count}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{margin: 4}}>
          <Text>₹{this.props.price}</Text>
        </View>
        </View>
      </View>
    );
  }
}
