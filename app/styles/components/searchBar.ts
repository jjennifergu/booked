import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export const searchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  searchContainer: {
    padding: spacing.md,
    paddingRight: 0,
    height: 66,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.cream[300],
    borderRadius: spacing.lg,
    padding: spacing.sm,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.sage[800],
    backgroundColor: colors.white,
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  recentContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream[300],
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  recentHeaderText: {
    fontSize: 14,
    color: colors.sage[600],
  },
  clearButton: {
    color: colors.primary,
    fontSize: 14,
  },
  recentItem: {
    padding: spacing.md,
    paddingVertical: spacing.sm,
  },
  recentText: {
    fontSize: 16,
    color: colors.text,
  },
}); 