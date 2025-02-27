import { StyleSheet } from 'react-native';
import { colors, shadows, spacing, borderRadius } from '../theme';

export const headerStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.cream[200],
    ...shadows.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    padding: spacing.md,
    color: colors.primary,
    letterSpacing: -1,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  viewToggle: {
    padding: spacing.sm,
    backgroundColor: colors.cream[200],
    borderRadius: borderRadius.full,
  },
}); 