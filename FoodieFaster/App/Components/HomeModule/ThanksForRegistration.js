import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class ThanksForRegistration extends Component {
  onClickMoreTable() {
    Actions.pop();
  }
  onClickHome() {
    Actions.tabbar();
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../Images/TableImages/success.png')}
          />
        </View>

        <Text style={styles.buttontext2}> Thank you</Text>
        <Text style={styles.buttontext2}> For Registration!</Text>

        <Text style={styles.buttontext}>
          Your booking has been confirmed for {this.props.selectedDate} at {this.props.selectedTime}.
        </Text>
        <TouchableOpacity onPress={this.onClickMoreTable}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: 44,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 22,
              borderWidth: 1,
            }}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Book More Table
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onClickHome}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: 44,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 22,
              borderWidth: 1,
              margin: 8,
            }}
          >
            <Text style={styles.buttontext2}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 20,
  },
  logo: {
    resizeMode: Image.resizeMode.contain,
    margin: 15,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 15,
    color: '#000',
  },
  buttonContainer: {
    backgroundColor: '#171717',
    paddingVertical: 15,
    marginTop: 15,
  },
  buttontext: {
    margin: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
  textLayout: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  buttontext2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ThanksForRegistration;
