import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/onboarding1.jpg')}
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
