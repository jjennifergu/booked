import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View, Image, Text } from 'react-native';
import { colors, shadows, spacing, borderRadius } from '../styles/theme';
import { Library, getLibraryImage } from '../models/Library';
import { getTagStyle, baseTagStyle } from '../styles/tags';
import { Link } from 'expo-router';
import { cardStyles } from '../styles/components/card';

interface LibraryCardProps {
  library: Library;
  onPress: () => void;
  isGridView: boolean;
  gridCardSize?: number;
  listImageSize?: number;
}

export function LibraryCard({ library, onPress, isGridView, gridCardSize = 0, listImageSize = 0 }: LibraryCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const dynamicStyles = {
    gridCard: {
      width: gridCardSize,
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      overflow: 'hidden' as const,
      ...shadows.md,
      marginBottom: spacing.md,
    },
    gridImage: {
      width: gridCardSize,
      height: gridCardSize * 0.5,
      resizeMode: 'cover' as const,
    },
    gridPlaceholder: {
      width: gridCardSize * 0.2,
      height: gridCardSize * 0.2,
      alignSelf: 'center' as const,
      marginTop: gridCardSize * 0.125,
    },
    listImageContainer: {
      width: listImageSize,
      height: listImageSize,
      backgroundColor: colors.cream[200],
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      overflow: 'hidden' as const,
    },
    listImage: {
      width: listImageSize * 1.1,
      height: listImageSize * 1.1,
      resizeMode: 'cover' as const,
      alignSelf: 'center' as const,
    },
    listPlaceholder: {
      width: listImageSize * 0.55,
      height: listImageSize * 0.55,
      resizeMode: 'contain' as const,
    },
  };

  return (
    <Link href={`/library/${library.slug}`}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View 
          style={[
            cardStyles.card,
            isGridView ? dynamicStyles.gridCard : cardStyles.listCard,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <View style={isGridView ? null : dynamicStyles.listImageContainer}>
            <Image
              source={{ uri: getLibraryImage(library) }}
              style={
                library.imageUrl ? 
                  (isGridView ? dynamicStyles.gridImage : dynamicStyles.listImage) : 
                  (isGridView ? dynamicStyles.gridPlaceholder : dynamicStyles.listPlaceholder)
              }
              defaultSource={require('../../assets/images/placeholder.avif')}
              resizeMode={library.imageUrl ? "cover" : "contain"}
            />
          </View>
          <View style={cardStyles.cardContent}>
            <Text style={cardStyles.title}>{library.title}</Text>
            <Text style={cardStyles.location}>{library.spaceInfo.library}</Text>
            {!isGridView && (
              <Text 
                style={cardStyles.description} 
                numberOfLines={3}
              >
                {library.spaceInfo.description}
              </Text>
            )}
            <View style={cardStyles.tags}>
              <Text style={[cardStyles.tag, getTagStyle('category')]}>
                {library.spaceInfo.category}
              </Text>
              <Text style={[cardStyles.tag, getTagStyle('soundLevel')]}>
                {library.features.soundLevel[0]}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
} 