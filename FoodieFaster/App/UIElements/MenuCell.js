import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';

export class MenuCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      selectedRow: [],
      totalCount: 0,
    };
    this.increment.bind(this);
  }

  increment = () => {
    this.setState({count: this.state.count + 1}),
      this.props.increment(1, this.props);
  };
  decrement = () => {
    if (this.state.count > 0) {
      this.setState({count: this.state.count - 1});
      this.props.decrement(1, this.props);
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
          width: Dimensions.get('window').width,
          backgroundColor: 'white',
        }}
      >
        <View style={{width: Dimensions.get('window').width*0.85}}>
          <Text style={{margin: 4, color: 'black', fontWeight: 'bold'}}>{this.props.item_name}</Text>
          <Text style={{margin: 4, color: 'gray'}}>{this.props.description}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.increment}>
              <View
                style={{
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 4,
                  height: 25,
                  width: 25,
                }}
              >
                <Text style={{margin: 4}}>+</Text>
              </View>
            </TouchableOpacity>
            <Text style={{margin: 4, textAlign: 'center', alignSelf: 'center'}}>
              {this.state.count}
            </Text>
            <TouchableOpacity onPress={this.decrement}>
              <View
                style={{
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 4,
                  height: 25,
                  width: 25,
                }}
              >
                <Text style={{margin: 4}}>-</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin: 4}}>
          <Text>₹{this.props.price}</Text>
        </View>
      </View>
    );
  }
}
