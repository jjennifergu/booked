import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { TagType, getTagStyle } from '../styles/tags';
import { dummyLibraries } from '../models/Library';
import { Ionicons } from '@expo/vector-icons';
import { FilterDropdown } from './FilterDropdown';
import { colors } from '../styles/theme';
import { filterStyles as styles } from '../styles/components/filter';

type FilterCategory = {
  type: TagType;
  values: string[];
};

const getUniqueValues = (arr: string[]): string[] => [...new Set(arr)];

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    type: 'category',
    values: getUniqueValues(dummyLibraries.map(lib => lib.spaceInfo.category))
  },
  {
    type: 'soundLevel',
    values: getUniqueValues(dummyLibraries.flatMap(lib => lib.features.soundLevel))
  },
  {
    type: 'spaceType',
    values: getUniqueValues(dummyLibraries.flatMap(lib => lib.features.spaceType))
  },
  {
    type: 'spaceFeatures',
    values: getUniqueValues(dummyLibraries.flatMap(lib => lib.features.spaceFeatures))
  },
  {
    type: 'audienceTypes',
    values: getUniqueValues(dummyLibraries.flatMap(lib => lib.features.audienceTypes))
  }
];

const formatCategoryName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1').trim()
    .replace(/^./, str => str.toUpperCase());
};

interface FilterBarProps {
  selectedFilters: Set<string>;
  onToggleFilter: (filter: string, type: TagType) => void;
}

export function FilterBar({ selectedFilters, onToggleFilter }: FilterBarProps) {
  const [openCategory, setOpenCategory] = useState<TagType | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const filterRefs = useRef<{ [key: string]: View | null }>({});

  const handleCategoryPress = useCallback((category: TagType) => {
    const filterRef = filterRefs.current[category];
    if (filterRef) {
      filterRef.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({ 
          x: pageX, 
          y: y + 1.5*height
        });
        setOpenCategory(openCategory === category ? null : category);
      });
    }
  }, [openCategory]);

  const handleBackgroundPress = () => {
    if (openCategory) {
      setOpenCategory(null);
    }
  };

  const handleSelectOption = (value: string, type: TagType) => {
    if (value === '') {
      const currentSelected = Array.from(selectedFilters).find(filter => 
        FILTER_CATEGORIES.find(cat => cat.type === type)?.values.includes(filter)
      );
      if (currentSelected) {
        onToggleFilter(currentSelected, type);
      }
    } else {
      onToggleFilter(value, type);
    }
    setOpenCategory(null);
  };

  const selectedCategory = openCategory ? FILTER_CATEGORIES.find(cat => cat.type === openCategory) : null;

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {FILTER_CATEGORIES.map((category) => {
          const selectedValue = Array.from(selectedFilters).find(filter => 
            category.values.includes(filter)
          );
          
          const tagStyle = getTagStyle(category.type) || { color: colors.text, backgroundColor: colors.background };

          return (
            <View 
              key={category.type} 
              ref={ref => filterRefs.current[category.type] = ref}
              style={styles.filterContainer}
            >
              <TouchableOpacity
                onPress={() => handleCategoryPress(category.type)}
                style={styles.filterButton}
              >
                <Text
                  style={[
                    styles.filterText,
                    tagStyle,
                    selectedValue && {
                      backgroundColor: tagStyle.color,
                      color: 'white'
                    }
                  ]}
                >
                  {selectedValue || `All ${formatCategoryName(category.type)}`}
                  <Ionicons 
                    name={openCategory === category.type ? "chevron-up" : "chevron-down"} 
                    size={12} 
                    color={selectedValue ? "white" : tagStyle.color}
                    style={styles.icon}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {selectedCategory && (
        <View style={styles.dropdownContainer}>
          <FilterDropdown
            visible={true}
            position={dropdownPosition}
            category={selectedCategory}
            selectedValue={Array.from(selectedFilters).find(filter => 
              selectedCategory.values.includes(filter)
            )}
            onSelect={(value) => handleSelectOption(value, selectedCategory.type)}
            onClose={() => setOpenCategory(null)}
          />
        </View>
      )}
    </View>
  );
} 