import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../Styles/HomeStyles';

console.disableYellowBox = true;

class Home extends Component {

  componentDidMount() {
    try {
      const value = AsyncStorage.getItem('id');
      console.log(value)
    } catch (error) {
    }
  }

  onClickQRScan() {
    Actions.qrScreen();
  }

  onClickBookFromHome() {
    Actions.bookfromhome();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.onClickQRScan();
          }}
        >
          <View style={styles.button}>
            <Image source={require('../Images/scan.png')} style={{height: 75, width: 75, marginRight: 15}}/>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>QUICK SCAN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onClickBookFromHome}
        >
          <View style={styles.button}>
          <Image source={require('../Images/booktable.png')} style={{height: 75, width: 75, marginRight: 15}}/>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>BOOK A TABLE</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
