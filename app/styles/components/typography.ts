import { StyleSheet } from 'react-native';
import { colors } from '../theme';

export const typographyStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  location: {
    fontSize: 14,
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.sage[600],
    lineHeight: 20,
  },
}); 