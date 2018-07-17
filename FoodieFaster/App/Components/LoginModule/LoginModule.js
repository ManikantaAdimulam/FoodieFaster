import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import styles from '../../Styles/LoginStyles';
import Login from '../LoginModule/Login';
import Signup from '../LoginModule/Signup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PopupDialog from 'react-native-popup-dialog';
import {PacmanIndicator} from 'react-native-indicators';

class LoginModule extends Component {
  showPopup (res) {
    console.log(res)
    res ?  this.popupDialog.show (): this.popupDialog.dismiss ()
  }
  render () {
    return (
      <View style={[styles.container]}>
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          height={Dimensions.get('window').height*0.1}
          width={Dimensions.get('window').width*0.2}
        >
          <PacmanIndicator color="black" />
        </PopupDialog>
        <KeyboardAwareScrollView
          keyboardOpeningTime={100}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.keyboardAwareScrollView}
        >

          <View
            style={{
              height: Dimensions.get ('window').height * 0.3,
              width: Dimensions.get ('window').width,
              paddingTop: 30,
            }}
          >
            <View style={styles.imageView}>
              <Image
                source={require ('../../Images/Food.png')}
                style={styles.image}
              />
            </View>
          </View>
          <View
            style={{
              height: Dimensions.get ('window').height * 0.7,
              paddingTop: 75,
            }}
          >
            <ScrollableTabView
              tabBarActiveTextColor="#FFC538"
              renderTabBar={() => (
                <TabBar
                  tabMargin={Dimensions.get ('window').width * 0.25}
                  tabBarStyle={{justifyContent: 'center', alignItems: 'center'}}
                  underlineColor="#FFC538"
                />
              )}
            >
              <Login tabLabel={{label: 'LogIn'}} showIndicator={this.showPopup.bind(this)}/>
              <Signup tabLabel={{label: 'Signup'}} showIndicator={this.showPopup.bind(this)}/>
            </ScrollableTabView>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default LoginModule;
