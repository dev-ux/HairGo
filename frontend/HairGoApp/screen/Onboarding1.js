import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: '../assets/onboarding3.jpg' }} // Remplace par une vraie image ou utilise `require()`
        style={styles.image}
      />
      <Text style={styles.text}>Trouvez facilement des barbiers et des salons de coiffure à portée de main.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding2')}>
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
    padding: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
