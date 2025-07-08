import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Notification({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nouveau barbier disponible',
      message: 'Un nouveau barbier expert en coupes modernes est disponible près de chez vous.',
      date: 'Il y a 2 heures',
      read: false
    },
    {
      id: '2',
      title: 'Promotion spéciale',
      message: 'Profitez de 20% de réduction sur votre prochaine coupe de cheveux.',
      date: 'Il y a 1 jour',
      read: true
    },
    {
      id: '3',
      title: 'Rappel de rendez-vous',
      message: 'Votre rendez-vous avec Jean Dupont est demain à 15h.',
      date: 'Il y a 3 heures',
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.read && styles.unread]}
      onPress={() => {
        markAsRead(item.id);
        // Ici, nous pourrions ajouter une navigation vers une page de détail si nécessaire
      }}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>{item.title}</Text>
          <Text style={[styles.notificationDate, !item.read && styles.unreadDate]}>{item.date}</Text>
        </View>
        <Text style={[styles.notificationMessage, !item.read && styles.unreadMessage]}>{item.message}</Text>
      </View>
      {!item.read && (
        <View style={styles.unreadDot}>
          <Ionicons name="ios-circle" size={12} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.clearButton} onPress={markAllAsRead}>
          <Text style={styles.clearButtonText}>Tout marquer comme lu</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#0052FF',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unread: {
    backgroundColor: '#fff5f5',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  unreadTitle: {
    color: '#0052FF',
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
  unreadDate: {
    color: '#0052FF',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
  },
  unreadMessage: {
    color: '#0052FF',
  },
  unreadDot: {
    backgroundColor: '#FF4757',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
