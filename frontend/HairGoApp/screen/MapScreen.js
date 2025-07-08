import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const screenHeight = Dimensions.get('window').height;

export default function MapScreen() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);

  const markers = [
    {
      id: 1,
      nom: 'Barber Shop République',
      coordinate: {
        latitude: 48.867,
        longitude: 2.363,
      },
    },
    {
      id: 2,
      nom: 'Barber Shop Bastille',
      coordinate: {
        latitude: 48.853,
        longitude: 2.369,
      },
    },
    {
      id: 3,
      nom: 'Barber Shop Montmartre',
      coordinate: {
        latitude: 48.887,
        longitude: 2.341,
      },
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Calcule la distance à vol d'oiseau
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6371; // Rayon de la Terre (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    if (userLocation) {
      const dist = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        marker.coordinate.latitude,
        marker.coordinate.longitude
      );
      setDistanceKm(dist.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Nom du Salon"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker)}
          >
            <Image
              source={require('../assets/marker.png')} // remplacez par votre propre image
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}

        {/* Ligne entre utilisateur et salon */}
        {userLocation && selectedMarker && (
          <Polyline
            coordinates={[userLocation, selectedMarker.coordinate]}
            strokeColor="#007BFF"
            strokeWidth={4}
            lineDashPattern={[6, 6]}
          />
        )}
      </MapView>

      {/* Fiche info */}
      {selectedMarker && (
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>{selectedMarker.nom}</Text>
              <Text style={styles.desc}>Ouvert - Barber expérimenté</Text>
              <Text style={styles.distance}>📍 {distanceKm} km</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bookmark}>🔖</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactText}>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.directionButton}>
              <Text style={styles.directionText}>Direction</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 45,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: { fontSize: 16 },
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  infoHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  desc: { color: '#555', marginTop: 2 },
  distance: { marginTop: 4, color: '#f00' },
  bookmark: { fontSize: 22, marginLeft: 10 },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  contactButton: {
    backgroundColor: '#f33',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  contactText: { color: '#fff', fontWeight: 'bold' },
  directionButton: {
    backgroundColor: '#2575fc',
    padding: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  directionText: { color: '#fff', fontWeight: 'bold' },
});
