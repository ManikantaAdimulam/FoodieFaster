// import React, {Component} from 'react';
// import {Text, View, Dimensions, ListView, TouchableOpacity, AsyncStorage} from 'react-native';
import {
  PacmanIndicator,
} from 'react-native-indicators';

// class Indicator extends Component {
//   render () {
//     return (
//       <View
//         flex={1}
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'red'
//         }}
//       >
//       <View style={{height: 50, width: 50}}>
//         <PacmanIndicator color="black" />
//         </View>
//       </View>
//     );
//   }
// }
// export default Indicator;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class Indicator extends React.Component {

  componentDidMount() {
    this.popupDialog.show();
  }
  render () {
    return (
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
      >
        <PacmanIndicator color="black" />
      </PopupDialog>
    );
  }
}
