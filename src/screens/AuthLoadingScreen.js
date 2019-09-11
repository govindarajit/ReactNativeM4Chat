import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import User from '../../User';
import firebase from 'firebase';
// import firebaseApp from '../configs/firebaseConfig';
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION').then(
      response => {
        response ? null : this.requestLocationPermission();
      },
    );
    this._bootstrapAsync();
  }
  requestLocationPermission = async () => {
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // const status = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //   {
      //     title: 'MaCh4t request permission',
      //     message:
      //       'MaCh4t require permission to access your location' +
      //       "Please enable them or it can't  detect your location.",
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'DENIED',
      //     buttonPositive: 'GRANTED',
      //   },
      // );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show('Location permission granted.', ToastAndroid.LONG);
      } else if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  componentDidMount() {
    firebase.apps;
    if (!firebase.apps.length) {
      console.log('sayank');
      firebase.initializeApp({
        apiKey: 'AIzaSyB626G5y_ETKX_LY3vOY9qaQU3kUxXqil8',
        authDomain: 'mapschat-zeref.firebaseapp.com',
        databaseURL: 'https://mapschat-zeref.firebaseio.com',
        projectId: 'mapschat-zeref',
        storageBucket: 'mapschat-zeref.appspot.com',
        messagingSenderId: '929773866731',
        appId: '1:929773866731:web:a92708b53f28399bc7f8ae',
      });
    }
    this.eListener = [
      this.props.navigation.addListener('willFocus', () => {
        this._bootstrapAsync();
      }),
    ];
  }
  componentWillUnmount() {
    this.eListener.forEach(sub => {
      sub.remove();
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.id = await AsyncStorage.getItem('uid');
    User.avatar = await AsyncStorage.getItem('uavatar');
    this.props.navigation.navigate(User.id ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default AuthLoadingScreen;
