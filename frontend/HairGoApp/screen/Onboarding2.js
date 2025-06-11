import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/onboarding2.jpg')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Onboarding1')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Découvrez les meilleurs barbiers et salons près de chez vous.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding3')}>
        <Text style={styles.buttonText}>Suivant</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
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
