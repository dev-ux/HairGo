import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [user, setUser] = useState(null);
  const [hairdressers, setHairdressers] = useState([]);
  const [selectedHairdresser, setSelectedHairdresser] = useState(null);
  const [datetime, setDatetime] = useState('');
  const [service, setService] = useState('');

  useEffect(() => {
    fetchHairdressers();
  }, []);

  const fetchHairdressers = async () => {
    try {
      const response = await fetch(`${API_URL}/hairdressers`);
      const data = await response.json();
      setHairdressers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch hairdressers');
    }
  };

  const register = async () => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Registration failed', errorData.error);
        return;
      }
      const userData = await response.json();
      setUser(userData);
      Alert.alert('Success', 'Registered successfully');
    } catch (error) {
      Alert.alert('Error', 'Registration error');
    }
  };

  const login = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Login failed', errorData.error);
        return;
      }
      const userData = await response.json();
      setUser(userData);
      Alert.alert('Success', 'Logged in successfully');
    } catch (error) {
      Alert.alert('Error', 'Login error');
    }
  };

  const createReservation = async () => {
    if (!selectedHairdresser) {
      Alert.alert('Error', 'Please select a hairdresser');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: user.id,
          hairdresserId: selectedHairdresser.id,
          datetime,
          service,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Reservation failed', errorData.error);
        return;
      }
      Alert.alert('Success', 'Reservation created');
    } catch (error) {
      Alert.alert('Error', 'Reservation error');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register / Login</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <View style={styles.roleContainer}>
          <Button title="Client" onPress={() => setRole('client')} color={role === 'client' ? 'blue' : 'gray'} />
          <Button title="Hairdresser" onPress={() => setRole('hairdresser')} color={role === 'hairdresser' ? 'blue' : 'gray'} />
        </View>
        <Button title="Register" onPress={register} />
        <View style={{ height: 10 }} />
        <Button title="Login" onPress={login} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}</Text>
      <Text style={styles.subtitle}>Select a hairdresser:</Text>
      <FlatList
        data={hairdressers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={[styles.hairdresserItem, selectedHairdresser?.id === item.id && styles.selectedItem]}
            onPress={() => setSelectedHairdresser(item)}
          >
            {item.specialties.join(', ')} - {item.location}
          </Text>
        )}
      />
      <TextInput placeholder="Date and time (ISO format)" value={datetime} onChangeText={setDatetime} style={styles.input} />
      <TextInput placeholder="Service" value={service} onChangeText={setService} style={styles.input} />
      <Button title="Create Reservation" onPress={createReservation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  hairdresserItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  selectedItem: {
    backgroundColor: '#cce5ff',
  },
});
