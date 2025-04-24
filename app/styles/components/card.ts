import { StyleSheet } from 'react-native';
import { colors, shadows, spacing, borderRadius } from '../theme';
import { baseTagStyle } from '../tags';

export const createCardStyles = (gridCardSize: number, listImageSize: number) => ({
  gridCard: {
    width: gridCardSize,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden' as const,
    marginBottom: spacing.md,
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  gridCardNoImage: {
    width: gridCardSize,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden' as const,
    marginBottom: spacing.md,
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  gridImage: {
    width: gridCardSize,
    height: gridCardSize * 0.5,
    resizeMode: 'cover' as const,
  },
  gridPlaceholder: {
    width: gridCardSize * 0.2,
    height: gridCardSize * 0.2,
    alignSelf: 'center' as const,
    marginTop: gridCardSize * 0.125,
  },
  listImageContainer: {
    width: listImageSize * 1.4,
    height: listImageSize * 1.4,
    backgroundColor: colors.cream[200],
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  },
  listImage: {
    width: listImageSize * 1.5,
    height: listImageSize * 1.5,
    resizeMode: 'cover' as const,
  },
  listPlaceholder: {
    width: listImageSize * 0.55,
    height: listImageSize * 0.55,
    resizeMode: 'contain' as const,
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden' as const,
    ...shadows.md,
  },
  listCard: {
    width: '100%',
    marginBottom: spacing.md,
    flexDirection: 'row' as const,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden' as const,
    ...shadows.md,
    alignItems: 'center' as const,
  },
  listCardNoImage: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden' as const,
    ...shadows.md,
  },
  cardContent: {
    padding: spacing.xs,
    paddingLeft: spacing.md,
    gap: spacing.xs,
    flex: 1,
  },
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tag: {
    ...baseTagStyle,
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 2,
    marginBottom: 2,
  },
}); 