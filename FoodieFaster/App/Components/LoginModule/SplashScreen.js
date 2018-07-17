import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class SplashScreen extends Component {
  componentWillMount() {
    this.getData()
  }
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
    }, 3000);
  }
  async getData() {
    var usr = await AsyncStorage.getItem('id');
    var data = JSON.parse(usr);
    console.log(data)
    if (data != null) {
      Actions.tabbar();
    } else {
      Actions.loginmodule()
    }
    return user.id;
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../Images/splash.jpg')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffc442',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc442',
  },
});
