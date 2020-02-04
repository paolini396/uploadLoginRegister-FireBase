import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import firebase from '../../services/firebaseConnection';



export default class Cadastrar extends Component{

  static navigationOptions = {
    title: 'Cadastrar'
  }

  constructor(props){
    super(props);
    this.state ={ 
      email: '',
      senha: '',
      nome: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    // certificar que não tem nenhum usuário logado.
    firebase.auth().signOut();


    //olheiro - irá capiturar o usuario.
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        //acessando o uid como "user.uid"
        //cadastrando o usuário no banco de dados.
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome
        });
      }
    });
      
  }

  cadastrar(){
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) => {
      alert(error.code);
    });
  }


  render(){
    return(
      <View style={styles.container}>
        
        <Text style={styles.cadastrar}>Cadastro</Text>
        <TextInput onChangeText ={ (email) => {this.setState({email}) }} underlineColorAndroid="transparent" 
        style={styles.input} placeholder="Email...*"
        />

         <TextInput onChangeText ={ (nome) => {this.setState({nome}) }} underlineColorAndroid="transparent" 
        style={styles.input} placeholder="Nome...*"
        />
        
        
        <TextInput onChangeText ={ (senha) => { this.setState({senha})}} secureTextEntry={false} 
        underlineColorAndroid="transparent" style={styles.input} placeholder="Senha...*"   
        />
        
        <TouchableOpacity onPress={this.cadastrar} style={styles.botao} >
          <Text style={styles.textbnt} > Cadastrar </Text>
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