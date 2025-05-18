import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const wardrobeData = {
  Tişört: [
    require('../assets/defaults/thirt1.jpg'),
    require('../assets/defaults/tshirt2.jpeg'),
  ],
  Pantolon: [
    require('../assets/defaults/kiyafet1.jpg'),
    require('../assets/defaults/pants.jpg'),
  ],
  Etek: [
    require('../assets/defaults/etek1.jpg'),
    require('../assets/defaults/etek2.jpg'),
  ],  
};

export default function ProfileScreen() {
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (category) => {
    setExpanded((prev) => {
      // Eğer zaten açık olan kategoriye tıklanırsa kapat, değilse sadece onu aç
      if (prev[category]) {
        return { ...prev, [category]: false };
      } else {
        return { ...prev, [category]: true };
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={[styles.header, { marginTop: 40 }]}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.username}>Melike</Text>
          <Text style={styles.bio}>Modaya yön veren 👑</Text>
        </View>
      </View>

      {/* WARDROBE Başlığı */}
      <Text style={styles.wardrobeTitle}>WARDROBE</Text>

      {/* Kategoriler */}
      {Object.keys(wardrobeData).map((category) => (
        <View key={category}>
          <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <Ionicons
              name={expanded[category] ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {expanded[category] && (
            <FlatList
              data={wardrobeData[category]}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <Image source={item} style={styles.wardrobeImage} />
              )}
            />
          )}
        </View>
      ))}

      {/* Butonlar */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="add-circle-outline" size={32} color="#7c1e1e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('📸 Fotoğraf çekme modülü yakında!')}>
          <Ionicons name="camera-outline" size={32} color="#7c1e1e" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const imageSize = Dimensions.get('window').width / 3 - 10;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  info: { marginLeft: 16 },
  username: { fontSize: 20, fontWeight: 'bold', color: '#7c1e1e' },
  bio: { fontSize: 14, color: '#333', marginTop: 4 },
  wardrobeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    color: '#1e1e1e',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  categoryTitle: { fontSize: 16, color: '#333', fontWeight: '500' },
  wardrobeImage: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  button: {
    marginHorizontal: 20,
  },
});
