import { Library } from '../models/Library';

const API_URL = 'https://library.cornell.edu/wp-json/wp/v2/library_spaces';

interface ApiLibrarySpace {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    space_library: string;
    space_name: string;
    space_description: string;
    space_category: string;
    reservation_type: string;
    space_id: string;
    space_photo?: {
      url: string;
    };
    sound_level: Array<{
      name: string;
    }> | {
      name: string;
    };
    space_features: Array<{
      name: string;
    }> | {
      name: string;
    };
    space_type: Array<{
      name: string;
    }> | {
      name: string;
    };
    audience_types: Array<{
      name: string;
    }> | {
      name: string;
    };
  };
}

export async function fetchLibrarySpaces(): Promise<Library[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: ApiLibrarySpace[] = await response.json();
    
    return data.map(transformApiLibraryToModel);
  } catch (error) {
    console.error('Error fetching library spaces:', error);
    throw error;
  }
}

function transformApiLibraryToModel(apiLibrary: ApiLibrarySpace): Library {
  const spaceType = apiLibrary.acf?.space_type;
  const spaceTypeArray = Array.isArray(spaceType) ? spaceType : spaceType ? [spaceType] : [];

  const soundLevel = apiLibrary.acf?.sound_level;
  const soundLevelArray = Array.isArray(soundLevel) ? soundLevel : soundLevel ? [soundLevel] : [];

  const spaceFeatures = apiLibrary.acf?.space_features;
  const spaceFeaturesArray = Array.isArray(spaceFeatures) ? spaceFeatures : spaceFeatures ? [spaceFeatures] : [];

  const audienceTypes = apiLibrary.acf?.audience_types;
  const audienceTypesArray = Array.isArray(audienceTypes) ? audienceTypes : audienceTypes ? [audienceTypes] : [];

  return {
    id: apiLibrary.id,
    title: apiLibrary.title?.rendered || '',
    slug: apiLibrary.slug || '',
    spaceInfo: {
      library: apiLibrary.acf?.space_library || '',
      name: apiLibrary.acf?.space_name || '',
      description: apiLibrary.acf?.space_description || '',
      category: apiLibrary.acf?.space_category || '',
      reservationType: apiLibrary.acf?.reservation_type || '',
      spaceId: apiLibrary.acf?.space_id || '',
    },
    features: {
      soundLevel: soundLevelArray.map(level => level?.name) || [],
      spaceFeatures: spaceFeaturesArray.map(feature => feature?.name) || [],
      spaceType: spaceTypeArray.map(type => type?.name) || [],
      audienceTypes: audienceTypesArray.map(type => type?.name) || [],
    },
    imageUrl: apiLibrary.acf?.space_photo?.url,
  };
} 