import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { baseTagStyle } from '../tags';

export const layoutStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream[200],
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    zIndex: 1,
    backgroundColor: colors.cream[200],
  },
  container: {
    flex: 1,
    backgroundColor: colors.cream[200],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    paddingBottom: 0,
    gap: spacing.md,
  },
  list: {
    padding: spacing.md,
    paddingBottom: 0,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tag: {
    ...baseTagStyle,
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
}); 