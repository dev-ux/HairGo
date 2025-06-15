import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Utiliser le navigateur principal au lieu de naviguer directement vers Login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      }); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <View style={styles.container}> 
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userDetails}>
            
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
              <Icon name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/avatar.jpg')} // Remplace par l'image dynamique si tu veux
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.prenom} {user?.nom}</Text>
        </View>
      </View>

      {/* CARTE SOLDE */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Solde</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>12K $</Text>
          <Icon name="eye-off-outline" size={22} color="#fff" style={{ marginLeft: 10 }} />
        </View>
      </View>

      {/* BOUTONS RAPIDES */}
      <View style={styles.quickActions}>
        {['Demande', 'Historique', 'services', 'Banque'].map((text) => (
          <TouchableOpacity key={text} style={styles.actionButton}>
            <Text style={styles.actionText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTE UTILISATEURS */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Text style={styles.sectionTitle}>Près de vous</Text>
        {[1, 2].map((_, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={require('../assets/avatar.jpg')} style={styles.cardImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardName}>Nom C.</Text>
              <Text style={styles.cardDesc}>Lorem ipsum dolor sit amet, consectetur</Text>
              <Text style={styles.cardTime}>Il y'a {idx === 0 ? '30 sec' : '1 min'}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.buttonText}>Décliner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton}>
                  <Text style={styles.buttonText}>Confirmer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.subText}>plus éloigné</Text>
      </ScrollView>

     
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#0033A0',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
  },
  alertButton: {
    backgroundColor: '#FD3C4A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  alertText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 10,
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  onlineText: {
    marginTop: 10,
    color: '#fff',
  },

  balanceCard: {
    backgroundColor: '#0073e6',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    borderColor: '#FD3C4A',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  actionText: {
    color: '#FD3C4A',
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
  },
  cardTime: {
    fontSize: 12,
    color: '#999',
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 6,
  },
  declineButton: {
    backgroundColor: '#FD3C4A',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#0033A0',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  subText: {
    fontSize: 13,
    color: '#777',
    marginVertical: 8,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
