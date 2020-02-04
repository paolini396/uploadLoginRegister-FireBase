import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import firebase from '../../services/firebaseConnection';

import { NavigationActions, StackActions } from 'react-navigation';


export default class Home extends Component{

  static navigationOptions = {
    title: 'Home'
  }

  constructor(props){
    super(props);
    this.state ={ 
      nome: ''

    };

    this.sair = this.sair.bind(this);

    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        
        firebase.database().ref('usuarios').child(user.uid).once('value').then( (snapshot) => {
          let nome = snapshot.val().nome;
          let state = this.state;
          state.nome = nome;
          this.setState(state);
        });
      }
    })

  }

  


  sair(){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!')
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'})
      ]
      
    }));
  }

  render(){
    return(
      <View style={styles.container}>
        
        <Text style={styles.cadastrar}>Bem vindo {this.state.nome} </Text> 

        <TouchableOpacity onPress={this.sair} style={styles.botao} >
          <Text style={styles.textbnt} > Sair </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1C'
  },
  
  botao: {
    backgroundColor: '#34B233',
    width: 350,
    height: 50,
    borderRadius: 15,
    padding: 5,
    margin: 5
  },

  textbnt: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: "center",
    padding: 5,
    color: '#fff',
    fontWeight: 'bold'
  },
  cadastrar: {
    fontSize: 25,
    color: '#34B233',
    fontWeight: 'bold',
    textAlign: 'center',
    
  }
  

})