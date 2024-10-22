import {  StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#022238',
      
      alignItems: 'center',
    },
  
    image: {
      width: 300,
      height: 300,
      marginTop: 70,
      marginLeft: 10,
    },
  
    botao: {
      backgroundColor: '#005691',
      width: 150,
      alignItems: 'center',
      marginLeft: 10,
      borderRadius: 10,
      marginTop: 20,
    },
  
    textoBotao: {
      color: '#FFF',
      padding: 20,
      fontSize: 18,
    },
  
    loadingContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: -50,
      marginTop: -50,
      zIndex: 1
    },

    iphone:{ 
        flex: 1, 
        backgroundColor: '#022238'
    }
  });
  