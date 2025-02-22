import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { dummyLibraries } from "../models/Library";

export default function LibraryDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const library = dummyLibraries.find(lib => lib.id === parseInt(id));

  if (!library) return null;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: library.imageUrl }}
        style={styles.image}
        defaultSource={require('../../assets/images/placeholder.svg')}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{library.title}</Text>
        <Text style={styles.location}>{library.spaceInfo.library}</Text>
        <Text style={styles.description}>{library.spaceInfo.description}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.tags}>
            {library.features.spaceFeatures.map((feature, index) => (
              <Text key={index} style={styles.tag}>{feature}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound Level</Text>
          <View style={styles.tags}>
            {library.features.soundLevel.map((level, index) => (
              <Text key={index} style={styles.tag}>{level}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Space Type</Text>
          <View style={styles.tags}>
            {library.features.spaceType.map((type, index) => (
              <Text key={index} style={styles.tag}>{type}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available For</Text>
          <View style={styles.tags}>
            {library.features.audienceTypes.map((type, index) => (
              <Text key={index} style={styles.tag}>{type}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reservation</Text>
          <Text style={styles.reservationType}>{library.spaceInfo.reservationType}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
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
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    color: '#666',
  },
  reservationType: {
    fontSize: 16,
    color: '#333',
  },
}); 