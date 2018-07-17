import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import Camera from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Actions} from 'react-native-router-flux';

class QRScanning extends Component {
  constructor(props, context) {
    super(props, context);
  }
  onSuccess(e) {
    Actions.menu({hotelId:e.data})
  }
  componentDidMount() {
    this.scanner.reactivate()
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <View style={{width: Dimensions.get('window').width*0.8, height: Dimensions.get('window').height*0.5, borderWidth: 1  }}>
          <QRCodeScanner onRead={this.onSuccess.bind(this)} ref={(node) => { this.scanner = node }}/>
        </View>
      </View>
    );
  }
}

export default QRScanning;