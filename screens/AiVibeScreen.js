import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const STYLE_PRESETS = {
  sporty: [
    { top: { type: "T-shirt", color: "Beyaz", material: "Pamuk" }, bottom: { type: "Şort", color: "Siyah", material: "Polyester" }, shoe: { type: "Sneaker", color: "Beyaz", material: "Kanvas" } },
    { top: { type: "Spor Atlet", color: "Gri", material: "Polyester" }, bottom: { type: "Eşofman", color: "Lacivert", material: "Pamuk" }, shoe: { type: "Koşu Ayakkabısı", color: "Siyah", material: "Sentetik" } },
    { top: { type: "Sweatshirt", color: "Kırmızı", material: "Pamuk" }, bottom: { type: "Şort", color: "Beyaz", material: "Polyester" }, shoe: { type: "Sneaker", color: "Mavi", material: "Kanvas" } }
  ],
  dress: [
    { top: { type: "Elbise", color: "Kırmızı", material: "Viskon" }, bottom: null, shoe: { type: "Topuklu Ayakkabı", color: "Siyah", material: "Deri" } },
    { top: { type: "Elbise", color: "Mavi", material: "Pamuk" }, bottom: null, shoe: { type: "Babet", color: "Bej", material: "Deri" } },
    { top: { type: "Elbise", color: "Siyah", material: "Polyester" }, bottom: null, shoe: { type: "Topuklu Ayakkabı", color: "Kırmızı", material: "Süet" } }
  ],
  classic: [
    { top: { type: "Gömlek", color: "Mavi", material: "Pamuk" }, bottom: { type: "Pantolon", color: "Lacivert", material: "Yün" }, shoe: { type: "Klasik Ayakkabı", color: "Kahverengi", material: "Deri" } },
    { top: { type: "Ceket", color: "Siyah", material: "Yün" }, bottom: { type: "Kumaş Pantolon", color: "Gri", material: "Pamuk" }, shoe: { type: "Klasik Ayakkabı", color: "Siyah", material: "Deri" } },
    { top: { type: "Gömlek", color: "Beyaz", material: "Pamuk" }, bottom: { type: "Pantolon", color: "Krem", material: "Keten" }, shoe: { type: "Loafer", color: "Lacivert", material: "Deri" } }
  ],
  casual: [
    { top: { type: "Sweatshirt", color: "Gri", material: "Pamuk" }, bottom: { type: "Jean", color: "Açık Mavi", material: "Denim" }, shoe: { type: "Sneaker", color: "Beyaz", material: "Kanvas" } },
    { top: { type: "T-shirt", color: "Siyah", material: "Pamuk" }, bottom: { type: "Şort", color: "Haki", material: "Keten" }, shoe: { type: "Sandalet", color: "Kahverengi", material: "Deri" } },
    { top: { type: "Hırka", color: "Bej", material: "Yün" }, bottom: { type: "Jean", color: "Koyu Mavi", material: "Denim" }, shoe: { type: "Sneaker", color: "Gri", material: "Kanvas" } }
  ],
  boho: [
    { top: { type: "Bluz", color: "Bej", material: "Keten" }, bottom: { type: "Etek", color: "Kahverengi", material: "Pamuk" }, shoe: { type: "Sandlet", color: "Taba", material: "Deri" } },
    { top: { type: "Tunik", color: "Bordo", material: "Viskon" }, bottom: { type: "Pantolon", color: "Krem", material: "Keten" }, shoe: { type: "Babet", color: "Bej", material: "Deri" } },
    { top: { type: "Bluz", color: "Yeşil", material: "Pamuk" }, bottom: { type: "Etek", color: "Sarı", material: "Keten" }, shoe: { type: "Sandlet", color: "Kahverengi", material: "Deri" } }
  ],
  daily: [
    { top: { type: "T-shirt", color: "Lacivert", material: "Pamuk" }, bottom: { type: "Pantolon", color: "Siyah", material: "Polyester" }, shoe: { type: "Sneaker", color: "Gri", material: "Kanvas" } },
    { top: { type: "Sweatshirt", color: "Beyaz", material: "Pamuk" }, bottom: { type: "Jean", color: "Mavi", material: "Denim" }, shoe: { type: "Sneaker", color: "Siyah", material: "Kanvas" } },
    { top: { type: "Gömlek", color: "Açık Mavi", material: "Pamuk" }, bottom: { type: "Pantolon", color: "Bej", material: "Keten" }, shoe: { type: "Sandalet", color: "Kahverengi", material: "Deri" } }
  ]
};

const VIBE_OPTIONS = [
  { key: 'sporty', label: 'Sporty', bgColor: '#1a237e', textColor: '#fff' }, // Lacivert
  { key: 'dress', label: 'Dress', bgColor: '#ffb6c1', textColor: '#fff' }, // Pembe
  { key: 'classic', label: 'Classic', bgColor: '#111', textColor: '#fff' }, // Siyah
  { key: 'casual', label: 'Casual', bgColor: '#90caf9', textColor: '#fff' }, // Açık mavi
  { key: 'boho', label: 'Boho', bgColor: '#d2b48c', textColor: '#fff' }, // Açık kahverengi
  { key: 'daily', label: 'Daily', bgColor: '#ff9800', textColor: '#fff' }, // Turuncu
];

function getStyleOptions(mod) {
  const options = STYLE_PRESETS[mod] || STYLE_PRESETS['daily'];
  return options[Math.floor(Math.random() * options.length)];
}

export default function AiVibeScreen() {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const handleSelect = (key) => {
    setSelected(key);
    setResult(getStyleOptions(key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Vibe</Text>
      <FlatList
        data={VIBE_OPTIONS}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.optionsContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: item.bgColor },
              selected === item.key && styles.selectedOption
            ]}
            onPress={() => handleSelect(item.key)}
          >
            <Text style={[styles.optionText, { color: item.textColor }]}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      {selected === 'classic' && (
        <View style={styles.aiPhotoRow}>
          <View style={styles.aiPhotoCol}>
            <Image source={require('../assets/defaults/classicüst.jpg')} style={styles.aiPhoto} />
            <Image source={require('../assets/defaults/classicalt.jpg')} style={styles.aiPhoto} />
          </View>
        </View>
      )}
      {selected === 'daily' && (
        <View style={styles.aiPhotoRow}>
          <View style={styles.aiPhotoCol}>
            <Image source={require('../assets/defaults/dailyüst.jpg')} style={styles.aiPhoto} />
            <Image source={require('../assets/defaults/dailyalt.jpg')} style={styles.aiPhoto} />
          </View>
        </View>
      )}
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Önerilen Kombin:</Text>
          <Text style={styles.resultText}>Üst: {result.top.type} - {result.top.color} ({result.top.material})</Text>
          {result.bottom && <Text style={styles.resultText}>Alt: {result.bottom.type} - {result.bottom.color} ({result.bottom.material})</Text>}
          <Text style={styles.resultText}>Ayakkabı: {result.shoe.type} - {result.shoe.color} ({result.shoe.material})</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#7c1e1e', textAlign: 'center', marginVertical: 24 },
  optionsContainer: { alignItems: 'center', justifyContent: 'center' },
  option: {
    borderRadius: 12,
    paddingVertical: 12, // Kısaltıldı
    paddingHorizontal: 24,
    margin: 10,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedOption: {
    borderColor: '#7c1e1e',
    backgroundColor: '#ffeaea',
  },
  optionText: { fontSize: 18, color: '#7c1e1e', fontWeight: 'bold' },
  combinImageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  combinImage: {
    width: 180,
    height: 100,
    borderRadius: 16,
  },
  resultBox: {
    marginTop: 32,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#7c1e1e', marginBottom: 10 },
  resultText: { fontSize: 16, color: '#333', marginVertical: 2 },
  aiPhotoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  aiPhotoCol: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  aiPhoto: {
    width: 150,
    height: 150,
    borderRadius: 24,
    marginVertical: 10,
  },
});
