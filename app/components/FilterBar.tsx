import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { TagType, getTagStyle } from '../styles/tags';
import { Ionicons } from '@expo/vector-icons';
import { FilterDropdown } from './FilterDropdown';
import { colors } from '../styles/theme';
import { filterStyles as styles } from '../styles/components/filter';
import { Library } from '../models/Library';

type FilterCategory = {
  type: TagType;
  values: string[];
};

const getUniqueValues = (arr: string[]): string[] => [...new Set(arr)];

interface FilterBarProps {
  selectedFilters: Set<string>;
  onToggleFilter: (filter: string, type: TagType) => void;
  libraries: Library[];
}

export function FilterBar({ selectedFilters, onToggleFilter, libraries }: FilterBarProps) {
  const [openCategory, setOpenCategory] = useState<TagType | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const filterRefs = useRef<{ [key: string]: View | null }>({});

  const FILTER_CATEGORIES: FilterCategory[] = [
    {
      type: 'category',
      values: getUniqueValues(libraries.map(lib => lib.spaceInfo.category))
    },
    {
      type: 'reservationType',
      values: getUniqueValues(libraries.map(lib => lib.spaceInfo.reservationType))
    },
    {
      type: 'soundLevel',
      values: getUniqueValues(libraries.flatMap(lib => lib.features.soundLevel))
    },
    {
      type: 'spaceType',
      values: getUniqueValues(libraries.flatMap(lib => lib.features.spaceType))
    },
    {
      type: 'spaceFeatures',
      values: getUniqueValues(libraries.flatMap(lib => lib.features.spaceFeatures))
    },
    {
      type: 'audienceTypes',
      values: getUniqueValues(libraries.flatMap(lib => lib.features.audienceTypes))
    },
  ] as const;

  const formatCategoryName = (name: string): string => {
    return name
      .replace(/([A-Z])/g, ' $1').trim()
      .replace(/^./, str => str.toUpperCase());
  };

  const handleClearAll = () => {
    Array.from(selectedFilters).forEach(filter => {
      const category = FILTER_CATEGORIES.find(cat => cat.values.includes(filter));
      if (category) {
        onToggleFilter(filter, category.type);
      }
    });
  };

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
      {selectedFilters.size > 0 && (
        <TouchableOpacity
          onPress={handleClearAll}
          style={styles.clearButton}
        >
          <Ionicons name="close" size={16} color={colors.error} />
        </TouchableOpacity>
      )}
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