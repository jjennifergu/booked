import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TagType, getTagStyle, baseTagStyle } from '../styles/tags';
import { Ionicons } from '@expo/vector-icons';

interface FilterSelectModalProps {
  visible: boolean;
  onClose: () => void;
  category: { type: TagType; values: string[] } | null;
  selectedFilters: Set<string>;
  onToggleFilter: (filter: string, type: TagType) => void;
}

export function FilterSelectModal({ 
  visible, 
  onClose, 
  category, 
  selectedFilters, 
  onToggleFilter 
}: FilterSelectModalProps) {
  if (!category) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select {category.type}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.optionsList}>
            {category.values.map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.optionItem}
                onPress={() => onToggleFilter(value, category.type)}
              >
                <Text
                  style={[
                    styles.optionText,
                    getTagStyle(category.type),
                    selectedFilters.has(value) && styles.selectedOption,
                    selectedFilters.has(value) && {
                      backgroundColor: getTagStyle(category.type).color,
                      color: 'white'
                    }
                  ]}
                >
                  {value}
                </Text>
                {selectedFilters.has(value) && (
                  <Ionicons name="checkmark" size={20} color={getTagStyle(category.type).color} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  optionsList: {
    padding: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  optionText: {
    ...baseTagStyle,
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  selectedOption: {
    borderWidth: 0,
  },
}); 