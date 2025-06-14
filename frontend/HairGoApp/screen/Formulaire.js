import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Formulaire({ navigation }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateNaissance: '',
    telephone: '',
    indicatif: '+33',
    genre: '',
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.nom.trim()) {
      Alert.alert('Erreur', 'Le nom est requis');
      return false;
    }
    if (!formData.prenom.trim()) {
      Alert.alert('Erreur', 'Le prénom est requis');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Erreur', 'Lemail est requis');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Erreur', 'Le mot de passe est requis');
      return false;
    }
    if (!formData.confirmPassword.trim()) {
      Alert.alert('Erreur', 'La confirmation du mot de passe est requise');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (!formData.dateNaissance) {
      Alert.alert('Erreur', 'La date de naissance est requise');
      return false;
    }
    if (!formData.telephone.trim()) {
      Alert.alert('Erreur', 'Le numéro de téléphone est requis');
      return false;
    }
    if (!formData.genre) {
      Alert.alert('Erreur', 'Le genre est requis');
      return false;
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, avatar: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Enregistrer l'utilisateur
      const response = await axios.post('http://169.254.21.159:3000/api/auth/register', {
        ...formData,
        avatar: formData.avatar ? formData.avatar : null
      });

      // Sauvegarder le token et les informations
      const { token, user } = response.data;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));

      // Rediriger vers la page de connexion
      navigation.replace('Login');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Flèche retour */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Créez votre{'\n'}Compte</Text>

      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Image
          source={
            formData.avatar
              ? { uri: formData.avatar }
              : require('../assets/avatar-placeholder.png')
          }
          style={styles.avatar}
        />
        <View style={styles.editIcon}>
          <Icon name="pencil" size={14} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Nom */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={formData.nom}
          onChangeText={(text) => handleInputChange('nom', text)}
        />
      </View>

      {/* Prénom */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={formData.prenom}
          onChangeText={(text) => handleInputChange('prenom', text)}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Mot de passe */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />
      </View>

      {/* Confirmation du mot de passe */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          secureTextEntry
        />
      </View>

      {/* Date de naissance */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Date de naissance"
            value={formData.dateNaissance}
            onChangeText={(text) => handleInputChange('dateNaissance', text)}
          />
          <Icon name="calendar-outline" size={20} color="#888" style={styles.iconRight} />
        </View>
      </View>

      {/* Téléphone */}
      <View style={styles.inputContainer}>
        <View style={styles.phoneRow}>
          <Picker
            selectedValue={formData.indicatif}
            style={styles.picker}
            onValueChange={(value) => handleInputChange('indicatif', value)}
          >
            <Picker.Item label="🇫🇷 +33" value="+33" />
            <Picker.Item label="🇨🇮 +225" value="+225" />
            <Picker.Item label="🇧🇯 +229" value="+229" />
          </Picker>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Numéro de Tel"
            value={formData.telephone}
            onChangeText={(text) => handleInputChange('telephone', text)}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Genre */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={formData.genre}
          onValueChange={(value) => handleInputChange('genre', value)}
          style={styles.picker}
        >
          <Picker.Item label="Genre" value="" />
          <Picker.Item label="Masculin" value="masculin" />
          <Picker.Item label="Féminin" value="feminin" />
        </Picker>
      </View>

      {/* Bouton continuer */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>Créer mon compte</Text>}
      </TouchableOpacity>

      {/* Lien vers la connexion */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  backArrow: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
    width: '100%',
  },
  avatarContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f4b400',
    borderRadius: 10,
    padding: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: 12,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  picker: {
    width: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 30,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
