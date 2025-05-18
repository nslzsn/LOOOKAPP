import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const mockImages = [
  { id: '1', uri: require('../assets/defaults/yeni1.jpg') },
  { id: '2', uri: require('../assets/defaults/yeni2.jpg') },
  { id: '3', uri: require('../assets/defaults/yeni3.jpg') },
  { id: '4', uri: require('../assets/defaults/yeni4.jpg') },
];

export default function SwipeGallery() {
  const position = useRef(new Animated.ValueXY()).current;
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setIndex((prev) => (prev + 1) % mockImages.length);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          console.log('💚 LIKE');
          Animated.timing(position, {
            toValue: { x: width, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(nextCard);
        } else if (gesture.dx < -120) {
          console.log('💔 DISLIKE');
          Animated.timing(position, {
            toValue: { x: -width, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(nextCard);
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const bgColor = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['#4caf50', '#ffffff', '#e53935'],
  });

  return (
    <Animated.View
      style={[styles.cardContainer, { backgroundColor: bgColor }]}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={mockImages[index].uri}
        style={[styles.image, { transform: [{ rotate }, ...position.getTranslateTransform()] }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  image: {
    width: width - 40,
    height: height * 0.75,
    borderRadius: 20,
  },
});
