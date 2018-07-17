import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import request from '../../Actions/ActionCreator';
import Api from '../../Networking/APIS';
import {httpMethodes} from '../../Constants/Constants';
import {Actions} from 'react-native-router-flux';
import {TextField} from 'react-native-material-textfield';
import styles from '../../Styles/LoginStyles';

class OTPVerification extends Component {
  constructor (props) {
    super (props);
    this.state = {
      otp: '',
    };
  }

  onVerifyOTP() {
    console.log(this.state.phonenumber, this.state.otp)
    const {dispatch} = this.props;
    let parameters = {
      phoneNumber: this.props.phonenumber,
      otp: this.state.otp,
    };
    console.log(parameters)
    dispatch (
      request (Api.otpVerifivation, httpMethodes.post, parameters)
    ).then (response => {
      console.log (response);
      if (response.ok) {
        Actions.tabbar()
      } else {
        console.log ('error');
      }
    });
  }

  render () {
    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
              <View style={styles.textFeild}>
                <TextField
                  keyboardType="numeric"
                  enablesReturnKeyAutomatically={true}
                  label="Enter OTP"
                  tintColor="black"
                  onChangeText={text => this.setState ({otp: text})}
                />
              </View>
              <TouchableOpacity onPress={() => this.onVerifyOTP()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.loginmodule()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> Go to login</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      );
  }
}

export default connect()(OTPVerification);
