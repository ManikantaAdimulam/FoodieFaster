import {StyleSheet, Dimensions, Image} from 'react-native';
import React, {Component} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  keyboardAwareScrollView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  imageView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Dimensions.get('window').height * 0.08,    
  },
  backgroundImage: {
    backgroundColor: 'red',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: Image.resizeMode.cover,
  },
  image: {
    height: Dimensions.get('window').height*0.3,
    width: Dimensions.get('window').width,
    resizeMode: Image.resizeMode.contain,
  },
  loginContainer: {
    paddingTop: 0,
    margin: 20,
  },
  textFeild: {
    width: Dimensions.get('window').width * 0.9,
  },
  button: {
    marginTop: 44,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  forgotpassword: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 3,
  },
});
export default styles;
