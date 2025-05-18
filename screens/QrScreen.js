import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [savedLinks, setSavedLinks] = useState([]);

  useEffect(() => {
    loadSavedLinks();
  }, []);

  const loadSavedLinks = async () => {
    const stored = await AsyncStorage.getItem('@qr_links');
    if (stored) {
      setSavedLinks(JSON.parse(stored));
    }
  };

  const saveNewLink = async (link) => {
    const updated = [link, ...savedLinks];
    setSavedLinks(updated);
    await AsyncStorage.setItem('@qr_links', JSON.stringify(updated));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await sendToQrAPI(uri);
    }
  };

  const sendToQrAPI = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'qr.jpg',
        type: 'image/jpeg',
      });

      const res = await axios.post('https://api.qrserver.com/v1/read-qr-code/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const qrData = res.data[0]?.symbol[0]?.data;

      if (qrData) {
        Alert.alert('✅ QR OKUNDU', qrData);
        await saveNewLink(qrData);
        setImageUri(null);
      } else {
        Alert.alert('❌ QR bulunamadı');
      }
    } catch (error) {
      Alert.alert('⚠️ Hata', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ height: 60 }} />
      <TouchableOpacity style={styles.roundedButton} onPress={pickImage}>
        <Text style={styles.roundedButtonText}>QR Fotoğrafı Seç</Text>
      </TouchableOpacity>
      <View style={{ height: 16 }} />
      <TouchableOpacity style={[styles.roundedButton, { backgroundColor: '#7c1e1e' }]} onPress={() => Alert.alert('Yakında', 'Fotoğraf çekme özelliği yakında eklenecek!')}>
        <Text style={[styles.roundedButtonText, { color: '#fff' }]}>Fotoğraf Çek</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.listHeader}>📜 Geçmiş QR Linkleri:</Text>
      {savedLinks.map((link, index) => (
        <Text key={index} style={styles.linkItem}>🔗 {link}</Text>
      ))}
      <View style={styles.bottomPanelContainer}>
        <Text style={styles.bottomPanelTitle}>Öne Çıkanlar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bottomPanelScroll}>
          <Image source={require('../assets/defaults/kombin.jpg')} style={styles.bottomPanelImage} />
          <Image source={require('../assets/defaults/kombin2.jpg')} style={styles.bottomPanelImage} />
          <Image source={require('../assets/defaults/kombinclassic2.jpeg')} style={styles.bottomPanelImage} />
        </ScrollView>
      </View>
      <View style={styles.bottomPanelContainer}>
        <Text style={styles.bottomPanelTitle}>Dolabımdakiler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bottomPanelScroll}>
          <Image source={require('../assets/defaults/classicüst.jpg')} style={styles.bottomPanelImage} />
          <Image source={require('../assets/defaults/classicalt.jpg')} style={styles.bottomPanelImage} />
          <Image source={require('../assets/defaults/dailyüst.jpg')} style={styles.bottomPanelImage} />
          <Image source={require('../assets/defaults/dailyalt.jpg')} style={styles.bottomPanelImage} />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  image: { width: 300, height: 300, marginTop: 20, borderRadius: 24 },
  listHeader: { marginTop: 30, fontSize: 16, fontWeight: 'bold', color: '#7c1e1e' },
  linkItem: { marginTop: 10, color: '#444', fontSize: 14, backgroundColor: '#f4f4f4', borderRadius: 16, padding: 8, overflow: 'hidden' },
  bottomPanelContainer: {
    marginTop: 32,
    width: '100%',
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  bottomPanelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c1e1e',
    marginLeft: 8,
    marginBottom: 8,
  },
  bottomPanelScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomPanelImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
  },
  roundedButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#7c1e1e',
    alignItems: 'center',
    minWidth: 220,
    elevation: 2,
  },
  roundedButtonText: {
    color: '#7c1e1e',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
