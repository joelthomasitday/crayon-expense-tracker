import React, { useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, SafeAreaView, Image } from 'react-native';
import CrayonText from '../components/CrayonText';
import CrayonCard from '../components/CrayonCard';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/Theme';
import { ArrowRight } from 'lucide-react-native';

// Import the specific crayon pie chart image
const WelcomeImage = require('../assets/welcome_illustration.png');

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.6;

const WelcomeScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx > 0) {
          pan.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(pan, {
            toValue: { x: width, y: 0 },
            useNativeDriver: true,
          }).start(() => navigation.replace('Home'));
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const translateX = pan.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, width],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image 
          source={WelcomeImage} 
          style={styles.mainIllustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomCard}>
        <CrayonText style={styles.title}>Manage your daily life expenses</CrayonText>
        <CrayonText style={styles.description}>
          DoodleSaver is a simple and efficient personal finance tracker that lets you scribble your daily spends and gold stars! 🖍️
        </CrayonText>

        <View style={styles.swipeTrack}>
          <CrayonText style={styles.swipeText}>Swipe to get started</CrayonText>
          <Animated.View
            style={[styles.swipeThumb, { transform: [{ translateX }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.thumbInner}>
              <ArrowRight color={COLORS.accent} size={24} />
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIllustration: {
    width: 320,
    height: 320,
  },
  bottomCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderTopLeftRadius: BORDER_RADIUS.l * 2,
    borderTopRightRadius: BORDER_RADIUS.l * 2,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: COLORS.text,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: SPACING.xl,
    lineHeight: 24,
  },
  swipeTrack: {
    height: 70,
    backgroundColor: COLORS.accent,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    paddingHorizontal: SPACING.s,
    overflow: 'hidden',
  },
  swipeText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  swipeThumb: {
    position: 'absolute',
    left: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
