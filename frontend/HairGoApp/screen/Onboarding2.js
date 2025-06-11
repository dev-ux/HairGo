import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/onboarding2.jpg')}
        style={styles.image}
      />
      <Text style={styles.text}>Découvrez les meilleurs barbiers et salons près de chez vous.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding1')}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
