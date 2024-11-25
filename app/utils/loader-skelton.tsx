import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Skeleton shimmer animation
const SkeletonLoader = () => {
  const shimmerAnim = new Animated.Value(0);

  // Infinite shimmer loop
  Animated.loop(
    Animated.sequence([
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(shimmerAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.loaderContainer}>
      {/* Skeleton for Train Classes */}
      <View style={styles.skeletonCard}>
        <Animated.View
          style={[
            styles.skeletonShimmer,
            {
              transform: [{ translateX: shimmerTranslateX }],
            },
          ]}
        />
      </View>
      <View style={styles.skeletonCard}>
        <Animated.View
          style={[
            styles.skeletonShimmer,
            {
              transform: [{ translateX: shimmerTranslateX }],
            },
          ]}
        />
      </View>
      <View style={styles.skeletonCard}>
        <Animated.View
          style={[
            styles.skeletonShimmer,
            {
              transform: [{ translateX: shimmerTranslateX }],
            },
          ]}
        />
      </View>
      <View style={styles.skeletonCard}>
        <Animated.View
          style={[
            styles.skeletonShimmer,
            {
              transform: [{ translateX: shimmerTranslateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 8,
    marginBottom: 1,
  },
  skeletonCard: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 30,
    borderRadius: 8,
    marginBottom: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0',
  },
});

export default SkeletonLoader;

