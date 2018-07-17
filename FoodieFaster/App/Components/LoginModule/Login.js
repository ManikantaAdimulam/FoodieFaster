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
  TextInput,
  AsyncStorage,
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

class Login extends React.Component {
  componentWillMount () {
    this.getData ();
  }
  async getData () {
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    if (data != null) {
      Actions.tabbar ();
    }
    return user.id;
  }
  constructor (props) {
    super (props);

    this.state = {
      username: '',
      password: '',
      phonenumber: '',
      otp: '',
      forgotpassword: false,
      buttonText: 'Login',
      validations: false,
      otpVerified: true,
    };
  }

  validation = () => {
    let feilds = [this.state.phonenumber, this.state.password];
    feilds.forEach (value => {
      if (value == '') {
        this.state.validations = false;
      } else {
        this.state.validations = true;
      }
    });
    if (this.state.validations) {
      this.onClickLogin ();
    } else {
      Alert.alert ('Feilds Should not be empty');
    }
  };
  async getCache (response) {
    try {
      await AsyncStorage.setItem ('id', JSON.stringify (response.data.Data[0]));
    } catch (error) {}
  }
  showIndicator (data) {
    this.props.showIndicator (data);
  }
  
  onClickLogin = () => {
    this.showIndicator (true);
    const {dispatch} = this.props;
    let parameters = {
      phoneNumber: this.state.phonenumber,
      password: this.state.password,
    };
    dispatch (
      request (Api.logInAPI, httpMethodes.post, parameters)
    ).then (response => {
      console.log (response);
      this.showIndicator (false);
      this.setState ({otpVerified: response.data.otp});
      if (response.data.otp) {
        if (response.ok) {
          this.getCache (response);
        } else {
          console.log ('error');
        }
        Actions.tabbar ();
      } else {
       Actions.otp({phonenumber: this.state.phonenumber})
      }
    });
  };

  onForgotPasswordClicked = () => {
    console.log ('forgotpassword');
  };
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
                keyboardType="numeric"
                label="Phone Number"
                maxLength={10}
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
            <View style={styles.forgotpassword}>
              <TouchableOpacity onPress={this.onForgotPasswordClicked}>
                <Text>Forgot password...?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.validation}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{this.state.buttonText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    logIn: state.LoginReducers,
  };
}
export default connect (mapStateToProps) (Login);
