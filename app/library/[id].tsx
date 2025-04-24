import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { dummyLibraries } from "../models/Library";
import { getTagStyle, baseTagStyle } from '../styles/tags';
import { WebViewModal } from '../components/WebViewModal';
import { useState } from 'react';
import React from "react";
import { colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const library = dummyLibraries.find(lib => lib.id === parseInt(id));
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [isHelpViewVisible, setIsHelpViewVisible] = useState(false);

  if (!library) return null;

  const handleCheckAvailability = () => {
    setIsWebViewVisible(true);
  };

  const handleGetHelp = () => {
    setIsHelpViewVisible(true);
  };

  const handleGetDirections = () => {
    const destination = encodeURIComponent(`${library.spaceInfo.library}, Cornell University, Ithaca, NY`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    Linking.openURL(url);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={library.imageUrl ? { uri: library.imageUrl } : require('../../assets/images/placeholder.avif')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.title}>{library.title}</Text>
              <Text style={styles.location}>{library.spaceInfo.library}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.directionsButton]}
              onPress={handleGetDirections}
            >
              <Ionicons name="navigate" size={24} color={colors.info} />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{library.spaceInfo.description}</Text>
          
          {library.features.spaceFeatures.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.tags}>
                {library.features.spaceFeatures.map((feature, index) => (
                  <Text key={index} style={[styles.tag, getTagStyle('spaceFeatures')]}>
                    {feature}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {library.features.soundLevel.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sound Level</Text>
              <View style={styles.tags}>
                {library.features.soundLevel.map((level, index) => (
                  <Text key={index} style={[styles.tag, getTagStyle('soundLevel')]}>
                    {level}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {library.features.spaceType.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Space Type</Text>
              <View style={styles.tags}>
                {library.features.spaceType.map((type, index) => (
                  <Text key={index} style={[styles.tag, getTagStyle('spaceType')]}>
                    {type}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {library.features.audienceTypes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available For</Text>
              <View style={styles.tags}>
                {library.features.audienceTypes.map((type, index) => (
                  <Text key={index} style={[styles.tag, getTagStyle('audienceTypes')]}>
                    {type}
                  </Text>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reservation</Text>
            <View style={styles.tags}>
              <Text style={[styles.tag, getTagStyle('reservationType')]}>
                {library.spaceInfo.reservationType}
              </Text>
            </View>
            {library.spaceInfo.reservationType === 'Reservable' && (
              <TouchableOpacity 
                style={[styles.availabilityButton, { backgroundColor: colors.primary }]}
                onPress={handleCheckAvailability}
              >
                <Text style={styles.availabilityButtonText}>Book Now</Text>
              </TouchableOpacity>
            )}
            {library.spaceInfo.reservationType === 'By request' && (
              <TouchableOpacity 
                style={[styles.availabilityButton]}
                onPress={handleGetHelp}
              >
                <Text style={styles.availabilityButtonText}>Contact Cornell Library</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <WebViewModal
        visible={isWebViewVisible}
        url={`https://spaces.library.cornell.edu/space/${library.spaceInfo.spaceId}`}
        onClose={() => setIsWebViewVisible(false)}
      />
      <WebViewModal
        visible={isHelpViewVisible}
        url="https://library.cornell.edu/get-help/ask/"
        onClose={() => setIsHelpViewVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    width: 100,
    resizeMode: 'contain',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    ...baseTagStyle,
  },
  categoryTag: getTagStyle('category'),
  soundLevelTag: getTagStyle('soundLevel'),
  spaceTypeTag: getTagStyle('spaceType'),
  spaceFeaturesTag: getTagStyle('spaceFeatures'),
  audienceTypesTag: getTagStyle('audienceTypes'),
  reservationType: {
    fontSize: 16,
    color: '#333',
  },
  availabilityButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  availabilityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  directionsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.infoLight,
  },
}); 