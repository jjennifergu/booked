import { Modal, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../styles/theme';

interface WebViewModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
}

export function WebViewModal({ visible, url, onClose }: WebViewModalProps) {
  const handleOpenInBrowser = async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenInBrowser} style={styles.browserButton}>
            <Ionicons name="open-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <WebView 
          source={{ uri: url }}
          style={styles.webview}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream[300],
    gap: spacing.sm,
  },
  closeButton: {
    padding: spacing.xs,
  },
  browserButton: {
    padding: spacing.xs,
  },
  webview: {
    flex: 1,
  },
}); 