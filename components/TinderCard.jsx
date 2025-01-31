import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function TinderCard({ item, onSwipeLeft, onSwipeRight, isFirst }) {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const rotate = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const likeOpacity = translateX.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
  });

  const nopeOpacity = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
  });

  const cardStyle = {
    transform: [
      { translateX },
      { translateY },
      { rotate },
    ],
    zIndex: isFirst ? 1 : 0,
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;

      if (Math.abs(translationX) > SWIPE_THRESHOLD) {
        Animated.timing(translateX, {
          toValue: translationX > 0 ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          if (translationX > 0) {
            onSwipeRight && onSwipeRight();
          } else {
            onSwipeLeft && onSwipeLeft();
          }
        });
      } else {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  return (
    <View style={[styles.container, { position: 'absolute', width: '100%' }]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          
          <Animated.View style={[styles.overlay, styles.likeOverlay, { opacity: likeOpacity }]}>
            <Text style={[styles.overlayText, styles.likeText]}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.overlay, styles.nopeOverlay, { opacity: nopeOpacity }]}>
            <Text style={[styles.overlayText, styles.nopeText]}>NOPE</Text>
          </Animated.View>

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.age}>{item.age}</Text>
          </View>

          <View style={styles.actions}>
            <View style={[styles.button, styles.nopeButton]}>
              <Entypo name="cross" size={40} color="#F06795" />
            </View>
            <View style={[styles.button, styles.likeButton]}>
              <AntDesign name="heart" size={34} color="#64EDCC" />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    padding: 15,
    borderWidth: 3,
    borderRadius: 10,
  },
  likeOverlay: {
    right: 40,
    borderColor: '#64EDCC',
  },
  nopeOverlay: {
    left: 40,
    borderColor: '#F06795',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  likeText: {
    color: '#64EDCC',
  },
  nopeText: {
    color: '#F06795',
  },
  info: {
    position: 'absolute',
    bottom: 100,
    left: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  age: {
    fontSize: 24,
    color: 'white',
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});