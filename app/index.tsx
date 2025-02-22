import { ScrollView, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { useState, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyLibraries, Library } from "./models/Library";
import { SearchBar } from "./components/SearchBar";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  const saveRecentSearch = async (search: string) => {
    if (!search.trim()) return;
    
    try {
      const newSearches = [
        search,
        ...recentSearches.filter(s => s !== search)
      ].slice(0, MAX_RECENT_SEARCHES);
      
      setRecentSearches(newSearches);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleSubmitSearch = (text: string) => {
    if (text.trim()) {
      saveRecentSearch(text);
    }
  };

  const handleSelectRecent = (search: string) => {
    setSearchQuery(search);
    saveRecentSearch(search);
  };

  const handleClearRecent = async () => {
    setRecentSearches([]);
    await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const handlePressLibrary = (id: number) => {
    router.push(`/library/${id}`);
  };

  const filteredLibraries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyLibraries.filter((library) => {
      return (
        library.title.toLowerCase().includes(query) ||
        library.spaceInfo.description.toLowerCase().includes(query) ||
        library.spaceInfo.category.toLowerCase().includes(query) ||
        library.features.spaceFeatures.some(feature => 
          feature.toLowerCase().includes(query)
        ) ||
        library.features.soundLevel.some(level => 
          level.toLowerCase().includes(query)
        )
      );
    });
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Booked</Text>
          <View style={styles.header}>
            <SearchBar 
              value={searchQuery}
              onChangeText={handleSearch}
              recentSearches={recentSearches}
              onSelectRecent={handleSelectRecent}
              onSubmit={handleSubmitSearch}
              onClearRecent={handleClearRecent}
            />
            <TouchableOpacity 
              style={styles.viewToggle}
              onPress={() => setIsGridView(!isGridView)}
            >
              <Ionicons 
                name={isGridView ? "list" : "grid"}
                size={24} 
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.container, isGridView ? styles.grid : styles.list]}>
          {filteredLibraries.map((library) => (
            <TouchableOpacity 
              key={library.id}
              onPress={() => handlePressLibrary(library.id)}
            >
              <View 
                style={[
                  styles.card,
                  isGridView ? styles.gridCard : styles.listCard
                ]}
              >
                <Image
                  source={{ uri: library.imageUrl }}
                  style={[
                    styles.image,
                    isGridView ? styles.gridImage : styles.listImage
                  ]}
                  defaultSource={require('../assets/images/placeholder.svg')}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{library.title}</Text>
                  <Text style={styles.location}>{library.spaceInfo.library}</Text>
                  {!isGridView && (
                    <Text 
                      style={styles.description} 
                      numberOfLines={3}
                    >
                      {library.spaceInfo.description}
                    </Text>
                  )}
                  <View style={styles.tags}>
                    <Text style={styles.tag}>{library.spaceInfo.category}</Text>
                    <Text style={styles.tag}>{library.features.soundLevel[0]}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_CARD_SIZE = (SCREEN_WIDTH / 2) - 16;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '900',
    padding: 16,
    color: '#1a1a1a',
    letterSpacing: -1.5,
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  viewToggle: {
    padding: 16,
    width: 56,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  list: {
    padding: 8,
  },
  gridCard: {
    width: GRID_CARD_SIZE,
    height: GRID_CARD_SIZE,
    marginBottom: 16,
    overflow: 'hidden',
  },
  listCard: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: GRID_CARD_SIZE * 0.5,
    resizeMode: 'cover',
  },
  listImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 0,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: Dimensions.get('window').width / 2 - 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 'auto',
  },
  tag: {
    fontSize: 9,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    color: '#666',
  },
});
