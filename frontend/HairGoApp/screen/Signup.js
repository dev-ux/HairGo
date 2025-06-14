import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Inscription</Text>

      <Image
        source={require('../assets/signup.png')} // 🔁 Remplace par ton image locale
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Se connecter</Text>

      <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.socialText}>Continuer avec Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="facebook" size={20} color="#3b5998" />
        <Text style={styles.socialText}>Continuer avec Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="apple1" size={20} color="#000" />
        <Text style={styles.socialText}>Continuer avec Apple</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Formulaire')}
      >
        <Text style={styles.linkText}>Remplissez le formulaire</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Vous avez déjà un compte ?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Connectez-vous</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff',
    },
    backButton: {
      marginTop: 40,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      marginVertical: 10,
    },
    illustration: {
      width: '100%',
      height: 180,
      alignSelf: 'center',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 20,
      textAlign: 'center',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    socialText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#000',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc',
    },
    orText: {
      marginHorizontal: 10,
      color: '#777',
      fontSize: 13,
    },
    linkButton: {
      backgroundColor: '#0052FF',
      borderRadius: 20,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 10,
    },
    linkText: {
      color: '#fff',
      fontWeight: '500',
    },
    footerText: {
      textAlign: 'center',
      color: '#444',
      fontSize: 14,
    },
    footerLink: {
      color: '#0052FF',
      fontWeight: '600',
    },
  });
  