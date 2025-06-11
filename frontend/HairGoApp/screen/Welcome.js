import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <Text style={styles.title}>Bienvenue à</Text>
      <Text style={styles.logoText}>HairGo</Text>
      <Text style={styles.subtitle}>La solution connectée entre le barber et ses clients</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 0.4,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3366FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
