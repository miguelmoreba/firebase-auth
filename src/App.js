import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm.js';

class App extends Component {

  state = { loggedIn: null};

  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyAca_p5dQ_5dnXcCjxjL9rUAZc3059mpa8',
      authDomain: 'auth-react-native-f651e.firebaseapp.com',
      databaseURL: 'https://auth-react-native-f651e.firebaseio.com',
      projectId: 'auth-react-native-f651e',
      storageBucket: 'auth-react-native-f651e.appspot.com',
      messagingSenderId: '20906997186'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  };

  renderContent(){
    switch (this.state.loggedIn) {
      case true:
      return(
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      );
      case false:
      return <LoginForm/>;
      default:
      return <Spinner size="large"/>;
    }
  }

  render(){
    return(
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
};

export default App;
