import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Login() {
  const [currentUrl, setCurrentUrl] = useState(null); // Estado para armazenar a URL atual

  // Use efeito para lidar com o botão de "voltar" do dispositivo
  useEffect(() => {
    const backAction = () => {
      if (currentUrl) {
        // Se a WebView estiver aberta, ao pressionar "voltar" retornamos à tela inicial
        setCurrentUrl(null);
        return true; // Previne que o app feche
      }
      return false; // Permite o comportamento padrão de voltar (fechar app ou sair da página anterior)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Remove o listener ao desmontar o componente
  }, [currentUrl]);

  // Defina o User-Agent para um navegador compatível (Google Chrome)
  const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />

      {currentUrl ? (
        <WebView
          source={{ uri: currentUrl }} // Carrega a URL atual
          style={{ flex: 1 }}
          javaScriptEnabled={true} // Permite JavaScript
          userAgent={userAgent} // Define o User-Agent personalizado
          onError={() => setCurrentUrl(null)} // Lida com erros de navegação, retornando à tela inicial
        />
      ) : (
        <View style={styles.container}>
          <Image
            source={require('./Logo.png')} // Verifique o caminho correto da imagem
            style={styles.image}
          />

          <View>{/* BOTÕES */}
            <TouchableOpacity 
              style={styles.botao} 
              onPress={() => setCurrentUrl('https://app.milleniumproducoes.com/en/login')}
            >
              <Text style={styles.textoBotao}>Plataforma</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
