import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

class CircularCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'white',
      bgColor2: 'red',
    };
  }

  onSelect = () => {
    this.props.onSelect(this.props);
    this.setState({bgColor: 'red'});
  };

  getRowSelectionStyle(isSelect) {
    if (isSelect) {
      return {
        width: 63,
        height: 63,
        borderRadius: 63 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#FEC708',
      };
    } else {
      return {
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        padding: 5,
        backgroundColor: '#ffffff',
        borderWidth: 0.8,
        borderColor: 'gray',
      };
    }
  }
  getTextColor(isSelect) {
    if (isSelect) {
      return {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
      };
    } else {
      return {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      };
    }
  }
  dayTimeTextColor(isSelect) {
    if (isSelect) {
      return {
        color: 'white',
      };
    } else {
      return {
        color: 'gray',
      };
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onSelect}>
          <View style={this.getRowSelectionStyle(this.props[3])}>
            <Text style={this.getTextColor(this.props[3])}>
              {this.props[1]}
            </Text>
            <Text style={this.dayTimeTextColor(this.props[3])}>
              {this.props[2]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  bgView: {
    width: Dimensions.get('window').width * 0.82,
    flexDirection: 'row',
    margin: 10,
    marginTop: 0,
    borderColor: 'black',
  },
  CircleShapeView: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  image: {
    height: 30,
    width: 30,
  },
  textHeading: {
    width: Dimensions.get('window').width * 0.5,
    fontWeight: 'bold',
    fontSize: 15,
    // color: 'black',
  },
  textConfirm: {
    fontWeight: 'bold',
    fontSize: 15,
    // color: '#007fc8',
  },
  dropdownFeild: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width * 0.8,
    height: 30,
    justifyContent: 'center',
  },
  textCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    // color: '#007fc8',
  },
  dropdownTextStyle: {
    color: 'brown',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingLeft: 10,
    margin: 1,
  },
});
export default CircularCell;
