import { View, TextInput, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { searchBarStyles } from '../styles/components/searchBar';
import { colors } from '../styles/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  recentSearches: string[];
  onSelectRecent: (search: string) => void;
  onSubmit: (text: string) => void;
  onClearRecent: () => void;
}

export function SearchBar({ value, onChangeText, recentSearches, onSelectRecent, onSubmit, onClearRecent }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={searchBarStyles.container}>
      <View style={searchBarStyles.searchContainer}>
        <TextInput
          style={searchBarStyles.input}
          placeholder={isFocused ? "" : "Search libraries..."}
          placeholderTextColor={colors.sage[400]}
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
        <ScrollView style={searchBarStyles.recentContainer}>
          <View style={searchBarStyles.recentHeader}>
            <Text style={searchBarStyles.recentHeaderText}>Recent Searches</Text>
            <TouchableOpacity onPress={onClearRecent}>
              <Text style={searchBarStyles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={searchBarStyles.recentItem}
              onPress={() => onSelectRecent(search)}
            >
              <Text style={searchBarStyles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
} 