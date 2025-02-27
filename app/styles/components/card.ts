import { StyleSheet } from 'react-native';
import { colors, shadows, spacing, borderRadius } from '../theme';

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
    width: listImageSize,
    height: listImageSize,
    backgroundColor: colors.cream[200],
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  },
  listImage: {
    width: listImageSize * 1.1,
    height: listImageSize * 1.1,
    resizeMode: 'cover' as const,
    alignSelf: 'center' as const,
  },
  listPlaceholder: {
    width: listImageSize * 0.55,
    height: listImageSize * 0.55,
    resizeMode: 'contain' as const,
  },
});

export const cardStyles = StyleSheet.create({
  listCard: {
    width: '100%',
    marginBottom: spacing.md,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cream[200],
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.md,
    gap: spacing.xs,
    flex: 1,
  },
}); 