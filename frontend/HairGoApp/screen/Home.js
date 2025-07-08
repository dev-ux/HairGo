import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';


export default function Home({ navigation }) {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
    loadBarbers();
  }, []);

  const loadUser = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) setUser(JSON.parse(userInfo));
  };

  const loadBarbers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:3000/api/barbers', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000, // 10 second timeout
      });
      setBarbers(response.data);
    } catch (err) {
      console.error('Erreur API :', err);
      if (err.code === 'ECONNABORTED') {
        console.error('La requête a expiré');
      } else {
        console.error('Erreur serveur:', err.response?.data || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderBarber = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.nom} {item.prenom}</Text>
        <Text style={styles.desc}>Lorem ipsum dolor sit amet</Text>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color="#777" />
          <Text style={styles.distance}>{item.distance || '0.5 Km'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactText}>Contacter</Text>
      </TouchableOpacity>
      <Icon name="bookmark-outline" size={20} color="#2B2B2B" style={{ marginLeft: 8 }} />
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/user-icon.png')} style={styles.userIcon} />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="notifications-outline" size={22} />
        </TouchableOpacity>
          <Icon name="bookmark-outline" size={22} style={{ marginLeft: 15 }} />
        </View>
      </View>

      {/* Barre de recherche */}
      <TextInput
        placeholder="Rech..."
        style={styles.searchBar}
        placeholderTextColor="#aaa"
      />

      {/* Promo card */}
      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>30% off</Text>
        <Text style={styles.promoBold}>Jour Spécial 30%</Text>
        <Text style={styles.promoText}>Bénéficiez d'une réduction pour chaque commande aujourd'hui uniquement !</Text>
      </View>

      {/* Icônes catégories */}
      <View style={styles.categories}> 
        <View style={styles.catItem}>
          <Image source={require('../assets/cut.png')} style={styles.catIcon} />
          <Text>Coupe</Text>
        </View>
        <View style={styles.catItem}>
          <Image source={require('../assets/makeup.png')} style={styles.catIcon} />
          <Text>Make up</Text>
        </View>
      </View>

      {/* Filtres */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {['Offre spéciales', 'Tendance', 'Spécialiste', 'Historique'].map((f, i) => (
          <TouchableOpacity key={i} style={styles.filterBtn}>
            <Text style={styles.filterText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste barbiers */}
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBarber}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: '#fff' },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    marginTop: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    paddingLeft: 16,
    fontSize: 16,
  },
  promoCard: {
    marginTop: 20,
    backgroundColor: '#1746A2',
    borderRadius: 20,
    padding: 20,
  },
  promoTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  promoBold: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  promoText: {
    color: '#fff',
    fontSize: 14,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  catItem: {
    alignItems: 'center',
  },
  catIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#FD3C4A',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginRight: 10,
  },
  filterText: {
    color: '#FD3C4A',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    color: '#666',
    fontSize: 13,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  distance: {
    marginLeft: 5,
    color: '#333',
    fontSize: 13,
  },
  contactButton: {
    backgroundColor: '#FD3C4A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  contactText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
