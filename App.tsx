import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, StatusBar, BackHandler, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking'; // Importando o Linking
import { styles } from './styles';

export default function Login() {
  const [currentUrl, setCurrentUrl] = useState(null); // Estado para armazenar a URL atual
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

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

  const handleExternalLink = (url: string) => {
    // Abrir links externos no navegador padrão
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.iphone}>
      <StatusBar hidden={true} />

      {currentUrl ? (
        <>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#005691" />
            </View>
          )}

          <WebView
            source={{ uri: currentUrl }} // Carrega a URL atual
            style={{ flex: 1 }}
            javaScriptEnabled={true} // Permite JavaScript
            userAgent={userAgent} // Define o User-Agent personalizado
            onLoadStart={() => setLoading(true)} // Inicia o indicador de carregamento
            onLoadEnd={() => setLoading(false)} // Termina o indicador de carregamento
            onError={() => setCurrentUrl(null)} // Lida com erros de navegação, retornando à tela inicial
            onShouldStartLoadWithRequest={(request) => {
              return true; // Permite navegação para outras URLs permitidas
            }}
          />
        </>
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

