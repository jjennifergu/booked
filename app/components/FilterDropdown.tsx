import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TagType, getTagStyle } from '../styles/tags';
import { colors, shadows, spacing, borderRadius } from '../styles/theme';

interface FilterDropdownProps {
  visible: boolean;
  position: { x: number; y: number };
  category: { type: TagType; values: string[] };
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const formatCategoryName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1').trim()
    .replace(/^./, str => str.toUpperCase());
};

export function FilterDropdown({ 
  visible, 
  position, 
  category, 
  selectedValue, 
  onSelect,
  onClose 
}: FilterDropdownProps) {
  if (!visible) return null;

  const tagStyle = getTagStyle(category.type) || { color: colors.text, backgroundColor: colors.background };

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View 
        style={[
          styles.dropdown,
          {
            top: position.y,
            left: position.x,
            borderColor: tagStyle.color
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            <TouchableOpacity
              style={[
                styles.item,
                !selectedValue && {
                  backgroundColor: tagStyle.backgroundColor
                }
              ]}
              onPress={() => onSelect('')}
            >
              <Text
                style={[
                  styles.text,
                  { color: tagStyle.color }
                ]}
              >
                All {formatCategoryName(category.type)}
              </Text>
            </TouchableOpacity>
            {category.values.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.item,
                  selectedValue === value && {
                    backgroundColor: tagStyle.backgroundColor
                  }
                ]}
                onPress={() => onSelect(value)}
              >
                <Text
                  style={[
                    styles.text,
                    { color: tagStyle.color }
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.lg,
    minWidth: 180,
    maxHeight: 300,
    overflow: 'hidden',
    zIndex: 1000,
    marginTop: -4,
  },
  scrollView: {
    maxHeight: 200,
  },
  item: {
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream[300],
  },
  text: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
  },
}); 