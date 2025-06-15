import React, { useState } from 'react';
import {Text, TextInput, StyleSheet,
  TouchableOpacity, View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Ajouter au début du fichier
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [remember, setRemember] = useState(false);

  const CustomCheckBox = ({ value, onValueChange }) => (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={[styles.checkboxBase, value && styles.checkboxChecked]}
    >
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // Afficher les données envoyées
      console.log('Données de connexion:', { email, password });

      // Configurer l'entête Content-Type
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      }, config);

      console.log('Réponse du serveur:', response.data);
      const { token, user } = response.data;
      
      // Use AuthContext login function
      await login(response.data.user, response.data.token);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      console.error('Message d\'erreur:', error.response?.data?.message);
      console.error('Status:', error.response?.status);
      console.error('Données de réponse:', error.response?.data);
      setError(error.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Se connecter</Text>

      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="#aaa" style={styles.icon} />
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#999" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry placeholderTextColor="#999" value={password} onChangeText={setPassword} />
      </View>

      <View style={styles.rememberContainer}>
        <CustomCheckBox value={remember} onValueChange={setRemember} />

        <Text style={styles.rememberText}>Me rappeler</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Ou continuer avec</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={28} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={28} color="#db4a39" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Vous avez déjà un compte ?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerLink}>inscrivez-vous</Text>
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
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 15,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#0052FF',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#777',
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  socialButton: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#444',
  },
  footerLink: {
    color: '#0052FF',
    textDecorationLine: 'underline',
  },
});
