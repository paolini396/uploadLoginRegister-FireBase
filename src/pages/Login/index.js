import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import firebase from '../../services/firebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

console.disableYellowBox= true;

export default class Login extends Component{

  static navigationOptions = {
    title: 'Login'
  }

  constructor(props){
    super(props);
    this.state ={ 
      email: '',
      senha: ''
    
    };


    this.logar = this.logar.bind(this);
    this.cadastrar = this.cadastrar.bind(this);


    firebase.auth().signOut();

    

    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        

        //logando da página Home
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Home'})
          ]  
        }));

      }
    })

  }



  logar(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch( (error) => {
      if(error.code == 'auth/wrong-password'){
        alert('senha incorreta!')
      }else{
        alert('Usuário não cadastrado!')
      }

    });

  }

  cadastrar(){
    this.props.navigation.navigate('Cadastrar');
  }

  render(){
    return(
      <View style={styles.container}>
        
        <Text style={styles.cadastrar}>Entrar</Text>
        <TextInput onChangeText ={ (email) => {this.setState({email}) }} 
        underlineColorAndroid="transparent" 
        style={styles.input} placeholder="Email..."
        />

        <TextInput onChangeText ={ (senha) => { this.setState({senha})}} 
        secureTextEntry={true} 
        underlineColorAndroid="transparent" 
        style={styles.input} placeholder="Senha..." 
        />
        
        <TouchableOpacity onPress={this.logar} style={styles.botao} >
          <Text style={styles.textbnt} > Entrar </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.cadastrar} style={styles.botao} >
          <Text style={styles.textbnt} > Criar uma conta </Text>
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
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#4F4F4F',
    fontSize: 22,
    padding: 5,
    margin:  5,
    borderRadius: 15,

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
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    
  }
  

})