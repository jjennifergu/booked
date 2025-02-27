import { ScrollView, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Animated, useWindowDimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyLibraries, Library } from "./models/Library";
import { SearchBar } from "./components/SearchBar";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { TagType, getTagStyle, baseTagStyle } from './styles/tags';
import { FilterBar } from "./components/FilterBar";
import { FILTER_CATEGORIES } from './components/FilterBar';
import { colors, shadows, spacing, borderRadius } from './styles/theme';
import { layoutStyles } from './styles/components/layout';
import { headerStyles } from './styles/components/header';
import { cardStyles, createCardStyles } from './styles/components/card';
import { typographyStyles } from './styles/components/typography';

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const { width: windowWidth } = useWindowDimensions();
  
  const gridCardSize = (windowWidth - spacing.md * 3) / 2;
  const listImageSize = Math.min(windowWidth * 0.3, 120);

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

  const handleToggleFilter = (filter: string, type: TagType) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        Array.from(next).forEach(f => {
          if (FILTER_CATEGORIES.find(cat => cat.type === type)?.values.includes(f)) {
            next.delete(f);
          }
        });
        next.add(filter);
      }
      return next;
    });
  };

  const filteredLibraries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyLibraries.filter((library) => {
      const matchesSearch = 
        library.title.toLowerCase().includes(query) ||
        library.spaceInfo.description.toLowerCase().includes(query) ||
        library.spaceInfo.category.toLowerCase().includes(query) ||
        library.features.spaceFeatures.some(feature => 
          feature.toLowerCase().includes(query)
        ) ||
        library.features.soundLevel.some(level => 
          level.toLowerCase().includes(query)
        );

      const matchesFilters = selectedFilters.size === 0 || Array.from(selectedFilters).every(filter => 
        library.spaceInfo.category === filter ||
        library.features.soundLevel.includes(filter) ||
        library.features.spaceType.includes(filter)
      );

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, selectedFilters]);

  const dynamicStyles = createCardStyles(gridCardSize, listImageSize);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={layoutStyles.safeArea}>
        <View style={layoutStyles.mainContainer}>
          <View style={headerStyles.headerContainer}>
            <Text style={headerStyles.headerTitle}>Booked</Text>
            <View style={headerStyles.header}>
              <SearchBar 
                value={searchQuery}
                onChangeText={handleSearch}
                recentSearches={recentSearches}
                onSelectRecent={handleSelectRecent}
                onSubmit={handleSubmitSearch}
                onClearRecent={handleClearRecent}
              />
              <TouchableOpacity 
                style={headerStyles.viewToggle}
                onPress={() => setIsGridView(!isGridView)}
              >
                <Ionicons 
                  name={isGridView ? "list" : "grid"}
                  size={24} 
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <FilterBar
              selectedFilters={selectedFilters}
              onToggleFilter={handleToggleFilter}
            />
          </View>

          <ScrollView style={layoutStyles.scrollContent}>
            <View style={[layoutStyles.container, isGridView ? layoutStyles.grid : layoutStyles.list]}>
              {filteredLibraries.map((library) => (
                <TouchableOpacity 
                  key={library.id}
                  onPress={() => handlePressLibrary(library.id)}
                >
                  <View 
                    style={[
                      cardStyles.card,
                      isGridView ? dynamicStyles.gridCard : cardStyles.listCard
                    ]}
                  >
                    <View style={isGridView ? null : dynamicStyles.listImageContainer}>
                      <Image
                        source={{ uri: library.imageUrl }}
                        style={
                          library.imageUrl ? 
                            (isGridView ? dynamicStyles.gridImage : dynamicStyles.listImage) : 
                            (isGridView ? dynamicStyles.gridPlaceholder : dynamicStyles.listPlaceholder)
                        }
                        defaultSource={require('../assets/images/placeholder.png')}
                        resizeMode={library.imageUrl ? "cover" : "contain"}
                      />
                    </View>
                    <View style={cardStyles.cardContent}>
                      <Text style={typographyStyles.title}>{library.title}</Text>
                      <Text style={typographyStyles.location}>{library.spaceInfo.library}</Text>
                      {!isGridView && (
                        <Text 
                          style={typographyStyles.description} 
                          numberOfLines={3}
                        >
                          {library.spaceInfo.description}
                        </Text>
                      )}
                      <View style={layoutStyles.tags}>
                        <Text style={[layoutStyles.tag, getTagStyle('category')]}>
                          {library.spaceInfo.category}
                        </Text>
                        <Text style={[layoutStyles.tag, getTagStyle('soundLevel')]}>
                          {library.features.soundLevel[0]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
