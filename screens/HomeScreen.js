import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const mockPosts = [
  {
    id: '1',
    username: 'Melike',
    imageUrl: require('../assets/defaults/melike.jpg'),
    likes: 182,
  },
  {
    id: '2',
    username: 'Elif',
    imageUrl: require('../assets/defaults/portrait-young-stylish-girl-model-casual-summer-clothes-brown-hat-with-natural-makeup-glasses-isolated.jpg'),
    likes: 95,
  },
  {
    id: '3',
    username: 'Mert',
    imageUrl: require('../assets/defaults/high-fashion-look-young-stylish-confident-happy-handsome-businessman-model-suit-cloth-lifestyle-street-sunglasses-look-his-watch.jpg'),
    likes: 203,
  },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imageUrl} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.likes}>❤️ {item.likes}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: 40 }]}>
        <Text style={styles.headerText}>LoooK</Text>
      </View>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
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
    height: 50,
    backgroundColor: '#7c1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  card: {
    margin: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  likes: {
    color: '#7c1e1e',
    fontWeight: 'bold',
  },
});
