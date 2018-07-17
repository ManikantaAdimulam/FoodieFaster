import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import request from '../../Actions/ActionCreator';
import Api from '../../Networking/APIS';
import {httpMethodes} from '../../Constants/Constants';
import {Actions} from 'react-native-router-flux';
import {TextField} from 'react-native-material-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../Styles/LoginStyles';
import PopupDialog from 'react-native-popup-dialog';
import {PacmanIndicator} from 'react-native-indicators';

class Signup extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      phonenumber: '',
      otp: '',
      validations: false,
    };
  }
  validation = () => {
    let feilds = [
      this.state.username,
      this.state.phonenumber,
      this.state.password,
    ];
    feilds.forEach (value => {
      if (value == '') {
        this.state.validations = false;
      } else {
        this.state.validations = true;
      }
    });
    if (this.state.validations) {
      this.onSignup ();
    } else {
      Alert.alert ('Feilds Should not be empty');
    }
  };
  onSignup = () => {
    this.showIndicator (true);
    const {dispatch} = this.props;
    let parameters = {
      name: this.state.username,
      phoneNumber: this.state.phonenumber,
      password: this.state.password,
    };
    console.log (parameters);
    dispatch (
      request (Api.registration, httpMethodes.post, parameters)
    ).then (response => {
      this.showIndicator (false);
      if (response.ok) {
        Actions.otp({phonenumber: this.state.phonenumber})
      } else {
        console.log ('error');
      }
    });
  };
  showIndicator (data) {
    this.props.showIndicator (data);
  }
  render () {
      return (
        <View style={styles.container}>
          <KeyboardAwareScrollView
            keyboardOpeningTime={100}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={styles.keyboardAwareScrollView}
          >
            <View style={styles.loginContainer}>
              <View style={styles.textFeild}>
                <TextField
                  label="User name"
                  tintColor="black"
                  onChangeText={text => this.setState ({username: text})}
                />
              </View>
              <View style={styles.textFeild}>
                <TextField
                  keyboardType="numeric"
                  label="Phone number"
                  tintColor="black"
                  onChangeText={text => this.setState ({phonenumber: text})}
                />
              </View>
              <View style={styles.textFeild}>
                <TextField
                  label="Password"
                  tintColor="black"
                  secureTextEntry={true}
                  onChangeText={text => this.setState ({password: text})}
                />
              </View>
              <TouchableOpacity onPress={this.validation}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Signup</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
          <PopupDialog
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
          >
            <PacmanIndicator color="black" />
          </PopupDialog>
        </View>
      );
    }
  }

function mapStateToProps (state) {
  return {
    logIn: state.LoginReducers,
  };
}
export default connect (mapStateToProps) (Signup);
