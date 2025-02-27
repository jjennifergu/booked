import { StyleSheet } from 'react-native';
import { colors, shadows, spacing, borderRadius } from '../theme';

export const filterStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 2,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    maxHeight: 40,
    marginTop: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterContainer: {
    position: 'relative',
  },
  filterButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  filterText: {
    fontSize: 14,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: spacing.sm,
  },
});

export const filterDropdownStyles = StyleSheet.create({
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
