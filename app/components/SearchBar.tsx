import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  recentSearches: string[];
  onSelectRecent: (search: string) => void;
  onSubmit: (text: string) => void;
  onClearRecent: () => void;
}

export function SearchBar({ 
  value, 
  onChangeText, 
  recentSearches,
  onSelectRecent,
  onSubmit,
  onClearRecent 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={isFocused ? "" : "Search libraries..."}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
            if (!value) onChangeText("");
          }}
          onSubmitEditing={() => onSubmit(value)}
          returnKeyType="search"
        />
      </View>
      
      {isFocused && recentSearches.length > 0 && (
        <ScrollView style={styles.recentSearchesContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentHeaderText}>Recent Searches</Text>
            <TouchableOpacity onPress={onClearRecent}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => onSelectRecent(search)}
            >
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 1,
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingRight: 0,
    height: 66,
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  recentSearchesContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  recentHeaderText: {
    fontSize: 14,
    color: '#666',
  },
  clearButton: {
    color: '#007AFF',
    fontSize: 14,
  },
  recentItem: {
    padding: 16,
    paddingVertical: 12,
  },
  recentText: {
    fontSize: 16,
    color: '#333',
  },
}); 