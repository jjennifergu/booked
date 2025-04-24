import { themeColors } from './theme';

export const TAG_STYLES = {
  category: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  soundLevel: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  spaceType: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
  },
  spaceFeatures: {
    backgroundColor: '#F3E5F5',
    color: '#7B1FA2',
  },
  audienceTypes: {
    backgroundColor: '#E0F2F1',
    color: '#00695C',
  },
  reservationType: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
} as const;

export type TagType = keyof typeof TAG_STYLES;

export const baseTagStyle = {
  fontSize: 14,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
};

export const getTagStyle = (type: TagType) => {
  switch (type) {
    case 'category':
      return {
        backgroundColor: themeColors.sage[50],
        color: themeColors.sage[800],
      };
    case 'soundLevel':
      return {
        backgroundColor: themeColors.moss[50],
        color: themeColors.moss[800],
      };
    case 'spaceType':
      return {
        backgroundColor: themeColors.earth[50],
        color: themeColors.earth[800],
      };
    case 'spaceFeatures':
      return {
        backgroundColor: themeColors.clay[50],
        color: themeColors.clay[800],
      };
    case 'audienceTypes':
      return {
        backgroundColor: themeColors.bark[50],
        color: themeColors.bark[800],
      };
    case 'reservationType':
      return {
        backgroundColor: themeColors.mocha[100],
        color: themeColors.mocha[800],
      };
  };
}; 