import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  Platform,
  AsyncStorage,
} from 'react-native';
import {
  Scene,
  Router,
  Stack,
  Tabs,
  Drawer,
  ActionConst,
  Actions,
  Overlay,
} from 'react-native-router-flux';
import Login from '../Components/LoginModule/Login';
import {StyleSheet} from 'react-native';
import QRScanning from '../Components/QRModule/QRScreen';
import LoginModule from '../Components/LoginModule/LoginModule';
import TabBar from '../Components/UserModule/TabBar';
import BookATable from '../Components/HomeModule/BookATableScreen';
import Home from '../Components/Home';
import MenuContainer from '../Components/MenuModule/MenuContainer';
import EditOrders from '../Components/MenuModule/OrdersEditing';
import SplashScreen from '../Components/LoginModule/SplashScreen';
import ThanksForRegistration
  from '../Components/HomeModule/ThanksForRegistration';
import Status from '../Components/Status';
import Indicator from '../UIElements/Indicator';
import OTPVerification from '../Components/LoginModule/OTPVerification';

class Route extends Component {
  async clearCache () {
    await AsyncStorage.removeItem ('id');
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    console.log (data, 'router');
    Actions.loginmodule ();
  }
  render () {
    return (
      <Router>
        <Stack
          key="root"
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          tintColor="white"
          hideNavBar={true}
        >
          <Scene
            key="splash"
            component={SplashScreen}
            hideNavBar={true}
            initial={Platform.OS === 'ios' ? false : true}
          />
          <Scene key="loginmodule" component={LoginModule} hideNavBar={true} />
          <Scene
            key="otp"
            component={OTPVerification}
            title="OTP"
            hideNavBar={false}
            type={ActionConst.RESET}
          />
          <Scene
            key="qrScreen"
            component={QRScanning}
            title="Scan QR Code"
            hideNavBar={false}
          />
          <Scene
            key="bookfromhome"
            component={BookATable}
            title="Book A Table"
            hideNavBar={false}
          />
          <Scene
            key="menu"
            component={MenuContainer}
            title="Menu"
            hideNavBar={false}
          />
          <Scene
            key="thankyou"
            component={ThanksForRegistration}
            title="Thank You"
            hideNavBar={false}
          />
          <Scene
            key="editOrders"
            component={EditOrders}
            title="Cart"
            hideNavBar={false}
          />
          <Scene key="modal" modal>
            <Scene key="overlay" component={Indicator} title="Map" hideNavBar />
          </Scene>
          {/* </Overlay> */}
          <Scene
            key="tabbar"
            lazy
            tabs={true}
            swipeEnabled={true}
            showLabel={false}
            tabBarPosition={'bottom'}
            type={ActionConst.RESET}
          >

            <Scene
              key="Home"
              title="Home"
              component={Home}
              hideNavBar={false}
              icon={TabIcon}
              onRight={() => this.clearCache ()}
              rightTitle={'Logout'}
            />
            <Scene
              key="Orders"
              title="My Bookings"
              component={TabBar}
              hideNavBar={false}
              icon={TabIcon}
            />
            <Scene
              key="status"
              component={Status}
              title="Order Status"
              // hideNavBar={true}
              icon={TabIcon}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
}
const styles = StyleSheet.create ({
  navBar: {
    backgroundColor: '#FFC538', // changing navbar color
  },
  navBarTitle: {
    color: '#FFFFFF',
  },
  barButtonTextStyle: {
    color: '#FFFFFF',
  },
  tab: {
    // flexDirection: 'row',
    width: Dimensions.get ('window').width / 3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC538',
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
    resizeMode: Image.resizeMode.fixed,
  },
});

export default Route;

const TabIcon = ({focused, title}) => {
  switch (title) {
    case 'Home':
      let iconHome = focused
        ? '../Images/home_white.png'
        : '../Images/home_black.png';
      return (
        <View style={styles.tab}>
          {focused
            ? <Image
                source={require ('../Images/home_white.png')}
                style={styles.icon}
              />
            : <Image
                source={require ('../Images/home_black.png')}
                style={styles.icon}
              />}
          <Text
            style={{
              color: focused ? 'white' : 'black',
            }}
          >
            {title}
          </Text>
        </View>
      );

    case 'My Bookings':
      return (
        <View style={styles.tab}>
          {focused
            ? <Image
                source={require ('../Images/info_white.png')}
                style={styles.icon}
              />
            : <Image
                source={require ('../Images/info_black.png')}
                style={styles.icon}
              />}
          <Text style={{color: focused ? 'white' : 'black'}}>{title}</Text>
        </View>
      );
    case 'Order Status':
      return (
        <View style={styles.tab}>
          {focused
            ? <Image
                source={require ('../Images/cart_white.png')}
                style={styles.icon}
              />
            : <Image
                source={require ('../Images/cart.png')}
                style={styles.icon}
              />}
          <Text style={{color: focused ? 'white' : 'black'}}>{title}</Text>
        </View>
      );
  }
};
