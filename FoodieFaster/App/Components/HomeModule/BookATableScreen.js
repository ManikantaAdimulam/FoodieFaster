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
  AsyncStorage,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Slider from 'react-native-slider';
import CircularCell from '../../UIElements/HorizantolListviewCell';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Api from '../../Networking/APIS';
import request from '../../Actions/ActionCreator';
import {httpMethodes} from '../../Constants/Constants';
import {itemsModel} from '../../ItemsData';
import {PacmanIndicator} from 'react-native-indicators';
import PopupDialog from 'react-native-popup-dialog';

var totalData2 = [];
var ds2;
var ds1;
var ds;
var totalData1 = [];
var value = [];
var hotelData = []
class BookATable extends Component {
  componentWillMount () {
    const {dispatch} = this.props;
    dispatch (request (Api.hotelList, httpMethodes.get)).then (response => {
      hotels = this.props.hotels.result.Data.forEach (item => {
        hotelData.push(item)
        this.state.hotels.push (item.hotelName);
      });
    });
    console.log ('componentWillMount', this.state, this.props);
  }

  componentDidMount () {
    console.log ('componentDidMount');
  }

  constructor (props) {
    super (props);
    ds = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
    ds1 = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
    ds2 = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});

    value = [
      {
        row: 0,
        selected: false,
        url: require ('../../Images/TableImages/table2.png'),
      },
      {
        row: 1,
        selected: false,
        url: require ('../../Images/TableImages/table4.png'),
      },
      {
        row: 2,
        selected: false,
        url: require ('../../Images/TableImages/table6.png'),
      },
    ];
    let value1 = {
      orders1: [
        {level: 16, description: 'Sat', tk: false},
        {level: 17, description: 'Sun', tk: false},
        {level: 18, description: 'Mon', tk: false},
        {level: 19, description: 'Tue', tk: false},
        {level: 20, description: 'Wed', tk: false},
        {level: 21, description: 'Thu', tk: false},
        {level: 22, description: 'Fri', tk: false},
        {level: 23, description: 'Sat', tk: false},
        {level: 24, description: 'Sun', tk: false},
        {level: 25, description: 'Mon', tk: false},
        {level: 26, description: 'Tue', tk: false},
        {level: 27, description: 'Wed', tk: false},
        {level: 28, description: 'Thu', tk: false},
        {level: 29, description: 'Fri', tk: false},
        {level: 30, description: 'Sat', tk: false},
        {level: 31, description: 'Sun', tk: false},
      ],
    };
    let value2 = {
      orders2: [
        {level: '01:00', description: 'AM', tk: false},
        {level: '02:00', description: 'AM', tk: false},
        {level: '03:00', description: 'AM', tk: false},
        {level: '04:00', description: 'AM', tk: false},
        {level: '05:00', description: 'AM', tk: false},
        {level: '06:00', description: 'AM', tk: false},
        {level: '07:00', description: 'AM', tk: false},
        {level: '08:00', description: 'AM', tk: false},
        {level: '09:00', description: 'AM', tk: false},
        {level: '10:00', description: 'AM', tk: false},
        {level: '11:00', description: 'AM', tk: false},
        {level: '12:00', description: 'AM', tk: false},
        {level: '01:00', description: 'PM', tk: false},
        {level: '02:00', description: 'PM', tk: false},
        {level: '03:00', description: 'PM', tk: false},
        {level: '04:00', description: 'PM', tk: false},
        {level: '05:00', description: 'PM', tk: false},
        {level: '06:00', description: 'PM', tk: false},
        {level: '07:00', description: 'PM', tk: false},
        {level: '08:00', description: 'PM', tk: false},
        {level: '09:00', description: 'PM', tk: false},
        {level: '10:00', description: 'PM', tk: false},
        {level: '11:00', description: 'PM', tk: false},
        {level: '12:00', description: 'PM', tk: false},
      ],
    };

    const {totalData1} = this.formateData1 (value1);
    const {totalData2} = this.formateData2 (value2);

    this.state = {
      value: 1,
      count: 0,
      dataSource: ds.cloneWithRows (value),
      dataSource1: ds1.cloneWithRows (totalData1),
      dataSource2: ds2.cloneWithRows (totalData2),
      bgColor: 'white',
      selectedDate: '',
      numberOfpeople: '',
      selectedTime: '',
      visible: false,
      hotels: [],
      selectedHotel: '',
    };
  }
  async callAPI () {
    this.setState ({visible: true});
    const {dispatch} = this.props;
    var usr = await AsyncStorage.getItem ('id');
    var data = JSON.parse (usr);
    let params = {
      user_id: data.id,
      hotel_id: this.state.selectedHotel,
      numberofPeolpe: parseInt (this.state.value),
      bookingDate: this.state.selectedDate,
      in_between: this.state.selectedTime,
    };
    this.setState ({visible: true});
    dispatch (
      request (Api.preboking, httpMethodes.post, params)
    ).then (response => {
      this.setState ({visible: false});
      if (response.ok) {
        Actions.thankyou ({
          selectedDate: this.state.selectedDate,
          selectedTime: this.state.selectedTime,
          noofPeople: this.state.numberofPeolpe,
        });
      } else {
      }
    });
  }
  hotelSelected (idx) {
    console.log (this.props.hotels.result.Data, idx, 'hotels');
    this.setState ({selectedHotel: hotelData[idx].id});
  }
  confirm = () => {
    {
      this.state.visible
        ? this.popupDialog.dismiss ()
        : this.popupDialog.show ();
    }
    this.callAPI ();
  };

  formateData1 (data) {
    const row = [];
    const level = [];
    const description = [];
    const orders = data['orders1'].forEach (data => {
      level.push (data['level']), description.push (data['description']);
    });
    if (level.length > 0) {
      for (i = 0; i < level.length; i++) {
        totalData1[i] = [(row[i] = i), level[i], description[i]];
      }
    }
    return {totalData1, level, description};
  }
  formateData2 (data) {
    const row = [];
    const level = [];
    const description = [];
    const tk = [];
    const orders = data['orders2'].forEach (data => {
      level.push (data['level']), description.push (
        data['description']
      ), tk.push (data['tk']);
    });
    if (level.length > 0) {
      for (i = 0; i < level.length; i++) {
        totalData2[i] = [(row[i] = i), level[i], description[i], tk[i]];
      }
    }
    return {totalData2, level, description, tk};
  }
  onSelectTime = data => {
    this.setState ({selectedTime: data[1] + ' ' + data[2]});
    for (i = 0; i < totalData2.length; i++) {
      if (data[0] != i) {
        totalData2[i][3] = false;
      } else {
        totalData2[i][3] = true;
      }
    }
    this.setState ({dataSource2: ds2.cloneWithRows (totalData2)});
  };
  onSelectDate = data => {
    this.setState ({selectedDate: data[2] + '-' + data[1] + '-' + '2017'});
    for (i = 0; i < totalData1.length; i++) {
      if (data[0] != i) {
        totalData1[i][3] = false;
      } else {
        totalData1[i][3] = true;
      }
    }
    this.setState ({dataSource1: ds1.cloneWithRows (totalData1)});
  };
  getTableStyle (status) {
    console.log (status);
    for (i = 0; i < value.length; i++) {
      if (status.row != i) {
        value[i].selected = false;
      } else {
        value[i].selected = true;
      }
      this.setState ({dataSource: ds.cloneWithRows (value)});
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: Dimensions.get ('window').height / 7,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
          }}
        >
          <Text style={styles.textHeading}> Choose a Hotel</Text>
          <View style={styles.bgView}>
            <ModalDropdown
              textStyle={{fontSize: 15, fontWeight: '200'}}
              defaultValue={' Please select hotel '}
              dropdownTextStyle={styles.dropdownTextStyle}
              options={this.state.hotels}
              dropdownStyle={styles.dropdownStyle}
              style={styles.dropdownFeild}
              onSelect={this.hotelSelected.bind (this)}
            />
            <Image
              source={require ('../../Assets/dropdown_arrow.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get ('window').height / 6.5,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: Dimensions.get ('window').width * 0.9,
            }}
          >
            <Text style={styles.textHeading}>Choose a Table</Text>
          </View>
          <View
            style={{
              height: 100,
              width: Dimensions.get ('window').width * 0.9,
            }}
          >
            <ListView
              enableEmptySections={true}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              dataSource={this.state.dataSource}
              renderRow={rowData => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.getTableStyle (rowData);
                    }}
                  >
                    <View>
                      <Image
                        source={rowData.url}
                        style={{
                          height: 100,
                          width: 100,
                          marginRight: 15,
                          resizeMode: Image.resizeMode.contain,
                          backgroundColor: rowData.selected
                            ? 'lightgray'
                            : 'white',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get ('window').height / 6.5,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: Dimensions.get ('window').width * 0.9,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.textHeading}>Number of Persons </Text>
            <Text style={styles.textConfirm}>
              {parseInt (this.state.value)}
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get ('window').width * 0.9,
            }}
          >
            <Slider
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor={'black'}
              thumbTintColor={'lightgray'}
              width={Dimensions.get ('window').width * 0.9}
              height={44}
              value={this.state.value}
              onValueChange={value => this.setState ({value})}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get ('window').height / 6.5,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: Dimensions.get ('window').width * 0.9,
            }}
          >
            <Text style={styles.textHeading}>Pick a date </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'gray',
                textAlign: 'right',
                width: Dimensions.get ('window').width * 0.4,
              }}
            >
              December 2017
            </Text>
          </View>
          <View style={{height: 70, paddingRight: 15, marginTop: 4}}>
            <ListView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              dataSource={this.state.dataSource1}
              renderRow={rowData => (
                <CircularCell
                  {...rowData}
                  onSelect={this.onSelectDate.bind (this)}
                />
              )}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get ('window').height / 6.5,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{width: Dimensions.get ('window').width * 0.9}}>
            <Text style={styles.textHeading}>Time</Text>
          </View>
          <View style={{height: 70, paddingRight: 15, marginTop: 4}}>
            <ListView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              dataSource={this.state.dataSource2}
              renderRow={rowData => (
                <CircularCell
                  {...rowData}
                  onSelect={this.onSelectTime.bind (this)}
                />
              )}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get ('window').height / 6.5,
            width: Dimensions.get ('window').width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: Dimensions.get ('window').height / 9.5,
              width: Dimensions.get ('window').width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={this.confirm}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  width: Dimensions.get ('window').width * 0.5,
                  height: 44,
                  borderRadius: 22,
                  borderWidth: 2,
                  borderColor: 'black',
                  shadowColor: 'black',
                  shadowRadius: 2,
                }}
              >
                <Text style={styles.textConfirm}>Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          height={Dimensions.get ('window').height * 0.1}
          width={Dimensions.get ('window').width * 0.2}
        >
          <PacmanIndicator color="black" />
        </PopupDialog>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get ('window').width,
    height: Dimensions.get ('window').height,
  },
  bgView: {
    width: Dimensions.get ('window').width * 0.82,
    flexDirection: 'row',
    borderColor: 'black',
  },
  CircleShapeView: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
  },
  textHeading: {
    width: Dimensions.get ('window').width * 0.5,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    marginTop: 8,
  },
  textConfirm: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  dropdownFeild: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get ('window').width * 0.8,
    height: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: 'gray',
  },
  dropdownTextStyle: {
    color: 'gray',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 44,
    width: Dimensions.get ('window').width * 0.9,
    fontSize: 15,
  },
  dropdownStyle: {
    width: Dimensions.get ('window').width * 0.85,
    borderWidth: 2,
  },
});

function mapStateToProps (state) {
  return {
    hotels: state.HotelsList,
  };
}
export default connect (mapStateToProps) (BookATable);
