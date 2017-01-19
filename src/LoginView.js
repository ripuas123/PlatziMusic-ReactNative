/*
# LoginView
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import ArtisList from './ArtisList';
import { getArtists } from './apiClient';

import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';

const config = {
  apiKey: 'AIzaSyC0Tpy9a7mJF8ZBTnQpxPDsb9J0SGZ2Rnw',
  authDomain: 'platzimusicreactnative.firebaseapp.com',
  databaseURL: 'https://platzimusicreactnative.firebaseio.com',
  storageBucket: 'platzimusicreactnative.appspot.com',
  messagingSenderId: '654043733386',
};

firebase.initializeApp(config);
const { FacebookAuthProvider } = firebase.auth;
const firebaseAuth = firebase.auth();

export default class LoginView extends Component {
  state = {
    credential: null
  }

  componentWillMount() {
    this.authenticateUser();
  }

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        Actions.home()
      }, (error) => {
        console.log("Sign in error", error)
      })
    })
  }
  // publishPermissions={['publish_actions']}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.saludo}>Bienvenido Alumno</Text>
        <Text style={styles.saludo}>
          {this.state.credentials && this.state.credentials.displayName}
        </Text>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={ this.handleLoginFinished }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      console.error(error)
    } else if (result.isCancelled) {
      console.warn("login is cancelled.");
    } else {
      this.authenticateUser()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saludo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'black',
  },
});
